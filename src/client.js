import ApolloClient, { createNetworkInterface } from 'apollo-client'

export default token => {
  const networkInterface = createNetworkInterface({
    uri: 'https://api.github.com/graphql',
  })

  networkInterface.use([
    {
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {} // Create the header object if needed.
        }
        req.options.headers['authorization'] = `bearer ${token}`
        next()
      },
    },
  ])

  return new ApolloClient({
    networkInterface,
  })
}
