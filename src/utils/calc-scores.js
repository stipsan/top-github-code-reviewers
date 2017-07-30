export default pullRequests => {
  const reviewers = new Map()

  // Scan each pull request
  pullRequests.edges.forEach(edge => {
    // Then check each code review
    edge.node.reviews.edges.forEach(edge => {
      const { node } = edge
      const { author: { login }, author } = node
      // Add author entry if one don't already exist
      if (!reviewers.has(login)) {
        reviewers.set(login, {
          author,
          stats: {
            comments: node.comments.totalCount,
            PENDING: 0,
            DISMISSED: 0,
            APPROVED: 0,
            CHANGES_REQUESTED: 0,
          },
          score: 0,
        })
      }

      // Cache object to avoid unnecessary property lookups
      const reviewer = reviewers.get(login)

      // A code review body counts as a comment
      if (node.body) {
        reviewer.stats.comments += 1
      }

      if (
        node.state === 'COMMENTED' ||
        (!node.body || !node.comments.totalCount)
      ) {
        reviewer.stats.comments += 1
      } else {
        reviewer.stats[node.state] += node.body ? 2 : 1
      }

      reviewers.set(login, reviewer)
    })
  })

  // Calculate scores
  reviewers.forEach((reviewer, login, map) => {
    // Each comment is one point
    reviewer.score += reviewer.stats.comments

    // A pending review counts as 2 points
    // This rewards letting contributors know a review is coming
    // But pending reviews on a PR that is merged can also mean
    // someone set the status to pending but forgot about it
    // and that behavior shouldn't be rewarded
    if (reviewer.stats.PENDING) {
      reviewer.score += 2 * reviewer.stats.PENDING
    }

    // A dismissed review means it was either a CHANGES_REQUESTED or APPROVED
    // which means someone took the time to give feedback
    // that is why it's worth 5 points
    // If someone is quick to approve or request changes after that
    // extra points is earned
    if (reviewer.stats.DISMISSED) {
      reviewer.score += 5 * reviewer.stats.DISMISSED
    }

    // Approving or requesting for changes is the best kind of feedback
    // that encourage progress. Either something must change
    // or it's ready to be merged.
    if (reviewer.stats.CHANGES_REQUESTED) {
      reviewer.score += 10 * reviewer.stats.CHANGES_REQUESTED
    }
    if (reviewer.stats.APPROVED) {
      reviewer.score += 10 * reviewer.stats.APPROVED
    }

    // Yes I know, mutating is bad but YOLO
  })

  // Create a flat array representation we can sort by score
  const topReviewers = [...reviewers.values()].sort((a, b) => b.score - a.score)

  return { topReviewers }
}
