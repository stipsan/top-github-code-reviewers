import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import queryString from 'query-string'

import './index.css'
import App from './App'
import createClient from './client'

// eslint-disable-next-line no-restricted-globals
const { access_token, owner, name } = queryString.parse(location.search)
const client = createClient(access_token)

ReactDOM.render(
  <ApolloProvider client={client}>
    <App owner={owner} name={name} />
  </ApolloProvider>,
  document.getElementById('root')
)
