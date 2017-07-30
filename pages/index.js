import { Component } from 'react'
import queryString from 'query-string'
import { ApolloProvider } from 'react-apollo'

import createClient from '../src/client'
import App from '../src/App'

export default class Index extends Component {
  static getInitialProps({ req }) {
    if (req) {
      // Runs only on the server
      const { access_token, owner, name } = req.query
      return { access_token, owner, name }
    }

    // Runs only in the client
    // eslint-disable-next-line no-restricted-globals
    const { access_token, owner, name } = queryString.parse(location.search)
    return { access_token, owner, name }
  }

  render() {
    const { access_token, owner, name } = this.props

    const client = createClient(access_token, { ssrMode: true })
    return (
      <div>
        Usage instructions will appear here, soonish.
        <ApolloProvider client={client}>
          <App
            owner={owner}
            name={name}
            onAvatarsDidLoad={msg => console.log(msg)}
          />
        </ApolloProvider>,
        <img
          src={`/svg?${queryString.stringify({ access_token, owner, name })}`}
        />
      </div>
    )
  }
}
