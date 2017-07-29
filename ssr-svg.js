import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
} from 'react-apollo'
import Express from 'express'
import { match, RouterContext } from 'react-router'
// A Routes file is a good shared entry-point between client and server
import routes from './routes'
// Note you don't have to use any particular http server, but
// we're using Express in this example

export default token => (req, res) => {
  // This example uses React Router, although it should work equally well with other
  // routers that support SSR
  match(
    { routes, location: req.originalUrl },
    (error, redirectLocation, renderProps) => {
      const client = new ApolloClient({
        ssrMode: true,
        // Remember that this is the interface the SSR server will use to connect to the
        // API server, so we need to ensure it isn't firewalled, etc
        networkInterface: createNetworkInterface({
          uri: 'http://localhost:3010',
          opts: {
            credentials: 'same-origin',
            headers: {
              cookie: req.header('Cookie'),
            },
          },
        }),
      })
      const app = (
        <ApolloProvider client={client}>
          <RouterContext {...renderProps} />
        </ApolloProvider>
      )
      // rendering code (see below)
    }
  )
}
