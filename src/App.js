import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import systemFontStack from 'system-font-stack'

import calcScores from './utils/calc-scores'
import Highscore from './Highscore'

const width = 640

class App extends Component {
  state = { foo: 'bar' }

  componentWillMount() {
    // Only run this on the server
    if (this.props.data.loading) {
      return
    }

    const avatarUrls = new Map()
    this.props.data.repository.pullRequests.edges.forEach(edge => {
      // Then check each code review
      edge.node.reviews.edges.forEach(edge => {
        const { node } = edge
        const { author: { login, avatarUrl } } = node
        avatarUrls.set(login, avatarUrl)
      })
    })
    this.props.onAvatarsDidLoad(avatarUrls)
  }

  render() {
    const { avatars = {} } = this.props
    const { repository, loading } = this.props.data

    if (loading) {
      return false
    }

    const { topReviewers } = calcScores(repository.pullRequests)

    const rowsTotal = topReviewers.length
    const rowsHeight = 64 * rowsTotal
    const height = rowsHeight + 64

    return (
      <svg
        width={`${width / 1.5}px`}
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>
          {this.state.foo}
        </title>
        <g fill="none" fillRule="evenodd" fontFamily={systemFontStack}>
          <text fontSize="22" fill="#586069" x="72" y="24">
            TOP CODE REVIEWERS
          </text>
          <text
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
              avatarUrl={avatars[reviewer.author.avatarUrl]}
              height={height}
              width={width}
              reviewer={reviewer}
              index={index}
            />
          )}
          <path
            d={`M 0 ${rowsHeight + 32} h ${width}`}
            stroke="#EAECEF"
            strokeLinecap="square"
          />
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
