import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'

import calcScores from './utils/calc-scores'
import Test from './Test'

const width = 640
const height = 640

class App extends Component {
  render() {
    const { repository, loading } = this.props.data

    if (loading) {
      return false
    }
    const data = JSON.stringify(calcScores(repository.pullRequests), null, 2)

    const { topReviewers } = calcScores(repository.pullRequests)

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
          <Test />
          <pre>
            <code dangerouslySetInnerHTML={{ __html: data }} />
          </pre>
        </div>
        <p className="App-intro">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Artboard</title>
            <g fill="none" fillRule="evenodd">
              {topReviewers.map((reviewer, i) => {
                return (
                  <g key={reviewer.author.login}>
                    <path
                      d={`M 0 ${i * 64}`}
                      d="M1.5 163.5h639.003"
                      stroke="#EAECEF"
                      stroke-linecap="square"
                    />
                    <text fontSize="22" fill="#FFF">
                      <tspan x="20" y="120">
                        {reviewer.author.login}
                      </tspan>
                    </text>
                  </g>
                )
              })}
              <rect
                fill="url(#b)"
                x="79"
                y="97"
                width="51"
                height="47"
                rx="8"
              />
              <path
                d="M1.5 163.5h639.003"
                stroke="#EAECEF"
                strokeLinecap="square"
              />
              <text fontSize="22" fill="#FFF">
                <tspan x="20" y="120">
                  🥇
                </tspan>
              </text>
              <text fontSize="22" fill="#000">
                <tspan x="13" y="223">
                  🥈
                </tspan>
              </text>
              <text fontSize="22" fill="#000">
                <tspan x="13" y="308">
                  🥉
                </tspan>
              </text>
              <text
                font-family="Helvetica"
                font-size="22"
                letter-spacing=".81"
                fill="#586069"
              >
                <tspan x="147" y="120">
                  Winner
                </tspan>
              </text>
              <text
                font-family="Helvetica"
                font-size="22"
                letter-spacing=".81"
                fill="#586069"
              >
                <tspan x="554" y="126">
                  10
                </tspan>
              </text>
              <text
                font-family="Helvetica"
                font-size="22"
                letter-spacing=".81"
                fill="#586069"
              >
                <tspan x="38" y="37">
                  Top Code Reviewers
                </tspan>
              </text>
              <text
                font-family="Helvetica"
                font-size="22"
                letter-spacing=".81"
                fill="#586069"
              >
                <tspan x="536" y="26">
                  Score
                </tspan>
              </text>
            </g>
          </svg>
        </p>
      </div>
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
