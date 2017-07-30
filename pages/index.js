import { Component } from 'react'
import { ApolloProvider } from 'react-apollo'

import { setToken } from '../src/utils/github-token'
import App from '../src/App'
import AppContainer from '../components/AppContainer'

export default class Index extends Component {
  state = {
    owner: 'facebook',
    name: 'react',
    ...this.props.url.query,
    dirty: false,
  }

  componentDidMount() {
    if (this.state.access_token) {
      // Set token in case the customizer is loaded
      setToken(this.state.access_token)
    }
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value, dirty: true })

  handleTokenChange = event => {
    const access_token = event.target.value
    setToken(access_token)
    this.setState({ access_token, dirty: true })
  }

  render() {
    const { access_token, owner, name, dirty } = this.state
    const href = access_token
      ? `/${owner}/${name}/${access_token}`
      : `/${owner}/${name}`
    return (
      <div>
        Usage instructions will appear here, soonish.
        <form>
          <input
            name="owner"
            type="text"
            value={owner}
            onChange={this.handleChange}
          />
          <input
            name="name"
            type="text"
            value={name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={access_token}
            onChange={this.handleTokenChange}
          />
          <input type="submit" />
        </form>
        {dirty
          ? <AppContainer key={access_token} owner={owner} name={name} />
          : <a href={`${href}.svg`} target="_blank">
              <img src={`${href}.svg`} />
            </a>}
        {/*
        <ApolloProvider client={client}>
          <App
            owner={owner}
            name={name}
            onAvatarsDidLoad={msg => console.log(msg)}
          />
        </ApolloProvider>,
        */}
      </div>
    )
  }
}
