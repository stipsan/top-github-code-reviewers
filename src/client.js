import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { getToken } from '../lib/github-token'

export default (options = {}) => {
  const networkInterface = createNetworkInterface({
    uri: 'https://api.github.com/graphql',
  })

  networkInterface.use([
    {
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {} // Create the header object if needed.
        }
        req.options.headers['authorization'] = `bearer ${getToken()}`
        next()
      },
    },
  ])

  networkInterface.useAfter([
    {
      applyAfterware({ response }, next) {
        if (response.status === 401) {
          throw new Error('Bad credentials, check your access_token')
        }
        next()
      },
    },
  ])

  return new ApolloClient({
    networkInterface,
    ...options,
  })
}
