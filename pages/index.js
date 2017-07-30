import { Component } from 'react'
import { ApolloProvider } from 'react-apollo'

import createClient from '../src/client'
import App from '../src/App'

export default class Index extends Component {
  render() {
    const { access_token, owner, name } = this.props.url.query
    const client = createClient(access_token, { ssrMode: true })
    const src = access_token
      ? `/${owner}/${name}/${access_token}.svg`
      : `/${owner}/${name}.svg`
    return (
      <div>
        Usage instructions will appear here, soonish.
        {src}
        <ApolloProvider client={client}>
          <App
            owner={owner}
            name={name}
            onAvatarsDidLoad={msg => console.log(msg)}
          />
        </ApolloProvider>,
        <img src={src} />
      </div>
    )
  }
}
