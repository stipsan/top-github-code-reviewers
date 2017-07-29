import ReactDOMServer from 'react-dom/server'

import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
  getDataFromTree,
} from 'react-apollo'

import App from './src/App'
import createClient from './src/client'

export default (fallbackToken = process.env.GITHUB_TOKEN) => (req, res) => {
  // This example uses React Router, although it should work equally well with other
  // routers that support SSR

  const { access_token, owner, name } = req.query

  const client = createClient(access_token, { ssrMode: true })

  console.log('constructing client', client)

  const app = (
    <ApolloProvider client={client}>
      <App owner={owner} name={name} />
    </ApolloProvider>
  )

  console.log('about to render')

  getDataFromTree(app).then(() => {
    // We are ready to render for real
    console.log('ready to render')
    res.status(200)
    res.send(`<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(app)}`)
    res.end()
  })
}
