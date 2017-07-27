import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import logo from './logo.svg'

import Test from './Test'

class App extends Component {
  render() {

    const data = JSON.stringify(this.props.data, null, 2)

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
          <Test />
          <pre><code dangerouslySetInnerHTML={{__html: data}} /></pre>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default graphql(gql`
  query($owner:String!, $name:String!) {
    rateLimit {
      limit
      cost
      remaining
      resetAt
    }
    repository(owner:$owner, name:$name) {
      pullRequests(last:100, states: MERGED) {
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
`, {
  options: ({repo, name}) => ({
    variables: {
      repo,
      name
    },
  }),
})(App);
