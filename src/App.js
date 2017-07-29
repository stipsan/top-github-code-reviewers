import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'

import calcScores from './utils/calc-scores'
import Highscore from './Highscore'

const width = 640

class App extends Component {
  render() {
    const { repository, loading } = this.props.data

    if (loading) {
      return false
    }

    const { topReviewers } = calcScores(repository.pullRequests)

    const height = (64 * topReviewers.length) + 32

    return (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Artboard</title>
        <g fill="none" fillRule="evenodd">
          <text
            fontFamily="Helvetica"
            fontSize="22"
            fill="#586069"
            x="72"
            y="24"
          >
              TOP CODE REVIEWERS
          </text>
          <text
            fontFamily="Helvetica"
            fontSize="22"
            fill="#586069"
            textAnchor="end"
            x={`${width - 24}`}
            y="24"
          >
            SCORE
          </text>
          {topReviewers.map((reviewer, index) =>
            <Highscore
              key={reviewer.author.login}
              height={height}
              width={width}
              reviewer={reviewer}
              index={index}
            />
          )}
          <rect fill="url(#b)" x="79" y="97" width="51" height="47" rx="8" />
        </g>
      </svg>
    )
  }
}

export default graphql(
  gql`
    query($owner: String!, $name: String!) {
      rateLimit {
        limit
        cost
        remaining
        resetAt
      }
      repository(owner: $owner, name: $name) {
        pullRequests(last: 100, states: MERGED) {
          edges {
            node {
              reviews(last: 10) {
                edges {
                  node {
                    author {
                      avatarUrl
                      login
                    }
                    body
                    state
                    comments(last: 100) {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
  {
    options: ({ owner, name }) => ({
      variables: {
        owner,
        name,
      },
    }),
  }
)(App)
