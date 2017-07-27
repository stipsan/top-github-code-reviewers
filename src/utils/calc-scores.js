
export default pullRequests => {
  const reviewers = new Map

  // Scan each pull request
  pullRequests.edges.forEach(edge => {
    // Then check each code review
    edge.node.reviews.edges.forEach(edge => {
      const {node} = edge
      const {author: {login}, author} = node
      // Add author entry if one don't already exist
      if(!reviewers.has(login)) {
        reviewers.set(login, {
          author,
          stats: {
          comments: 0,
          PENDING: 0,
          DISMISSED: 0,
          APPROVED: 0,
          CHANGES_REQUESTED: 0,
        },
        score: 0
      })
      }

      // Cache object to avoid unnecessary property lookups
      const reviewer = reviewers.get(login)

      // A code review body counts as a comment
      if(node.body) {
        reviewer.stats.comments += 1
      }

      reviewers.set(login, reviewer)
    })
  })

  // Calculate scores
  reviewers.forEach((reviewer, login, map) => {

    // Each comment is one point
    reviewer.score += reviewer.stats.comments

    // Yes I know, mutating is bad but YOLO
  })

  // Create a flat array representation we can sort by score
  const topReviewers = [...reviewers.values()].sort((a, b) => a.score - b.score)

  return {topReviewers}
}
