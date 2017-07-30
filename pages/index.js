import { Component } from 'react'
import styled from 'styled-components'

import Page from '../components/Page'
import { setToken } from '../src/utils/github-token'
import App from '../src/App'
import AppContainer from '../components/AppContainer'

const Input = styled.input`border-radius: 3px;`

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
    this.setState({ [name]: value })

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
      <Page>
        Usage instructions will appear here, soonish.
        <form>
          <Input
            name="owner"
            type="text"
            value={owner}
            onChange={this.handleChange}
          />
          <Input
            name="name"
            type="text"
            value={name}
            onChange={this.handleChange}
          />
          <Input
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
      </Page>
    )
  }
}
