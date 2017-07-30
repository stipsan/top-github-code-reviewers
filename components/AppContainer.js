import { ApolloProvider } from 'react-apollo'

import createClient from '../src/client'
import App from '../src/App'

const client = createClient()

export default ({ owner, name }) =>
  <ApolloProvider client={client}>
    <App owner={owner} name={name} onAvatarsDidLoad={msg => console.log(msg)} />
  </ApolloProvider>
