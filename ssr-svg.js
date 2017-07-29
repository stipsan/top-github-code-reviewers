import ReactDOMNodeStream from 'react-dom/node-stream'

import { ApolloProvider, getDataFromTree } from 'react-apollo'

import App from './src/App'
import createClient from './src/client'

export default (fallbackToken = process.env.GITHUB_TOKEN) => (
  req,
  res,
  next
) => {
  // This example uses React Router, although it should work equally well with other
  // routers that support SSR

  const { access_token, owner, name } = req.query

  const client = createClient(access_token, { ssrMode: true })

  const app = (
    <ApolloProvider client={client}>
      <App owner={owner} name={name} />
    </ApolloProvider>
  )

  // Run all graphql queries
  getDataFromTree(app)
    .then(() => {
      // We are ready to render for real
      res.set('Content-Type', 'image/svg+xml')
      //res.send(ReactDOMNodeStream.renderToStaticStream(app))
      ReactDOMNodeStream.renderToStaticStream(app).pipe(res)
    })
    .catch(next)
}
