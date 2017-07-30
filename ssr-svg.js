import ReactDOMNodeStream from 'react-dom/node-stream'

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

  const { access_token = fallbackToken, owner, name } = req.params

  const client = createClient(access_token, { ssrMode: true })

  const avatarGenerator = avatarLoader()
  avatarGenerator.next()

  const avatarPromise = new Promise((resolve, reject) => {
    avatarGenerator.next(resolve)
    // @todo error handling
  })

  const app = (avatars = {}) =>
    <ApolloProvider client={client}>
      <App
        avatars={avatars}
        owner={owner}
        name={name}
        onAvatarsDidLoad={urls => avatarGenerator.next(urls)}
      />
    </ApolloProvider>

  // Run all graphql queries
  getDataFromTree(app())
    .then(() => Promise.resolve(avatarPromise))
    .then(avatars => {
      const avatarMap = {}
      avatars.forEach(([avatarUrl, base64Url]) => {
        avatarMap[avatarUrl] = base64Url
      })
      // We are ready to render for real
      res.set('Content-Type', 'image/svg+xml')
      //res.send(ReactDOMNodeStream.renderToStaticStream(app))
      ReactDOMNodeStream.renderToStaticStream(app(avatarMap)).pipe(res)
    })
    .catch(next)
}
