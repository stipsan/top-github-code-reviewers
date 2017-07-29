import ReactDOMNodeStream from 'react-dom/node-stream'
import ReactDOMServer from 'react-dom/server'

import { ApolloProvider, getDataFromTree } from 'react-apollo'

import App from './src/App'
import createClient from './src/client'
import avatarLoader from './avatar-loader'

export default (fallbackToken = process.env.GITHUB_TOKEN) => (
  req,
  res,
  next
) => {
  // This example uses React Router, although it should work equally well with other
  // routers that support SSR

  const { access_token, owner, name } = req.query

  const client = createClient(access_token, { ssrMode: true })

  const avatarGenerator = avatarLoader()
  avatarGenerator.next()

  const avatarPromise = new Promise((resolve, reject) => {
    avatarGenerator.next(resolve)
    // @todo error handling
  })

  const app = (
    <ApolloProvider client={client}>
      <App
        owner={owner}
        name={name}
        onAvatarsDidLoad={urls => avatarGenerator.next(urls)}
      />
    </ApolloProvider>
  )

  // Run all graphql queries
  getDataFromTree(app)
    .then(() => avatarPromise)
    .then(avatars => {
      console.log('renders!', avatars)
      // We are ready to render for real
      res.set('Content-Type', 'image/svg+xml')
      //res.send(ReactDOMNodeStream.renderToStaticStream(app))
      const html = ReactDOMServer.renderToStaticMarkup(app)
      console.log('initial html', html)
      setTimeout(
        () => ReactDOMNodeStream.renderToStaticStream(app).pipe(res),
        6000
      )
    })
    .catch(next)
}
