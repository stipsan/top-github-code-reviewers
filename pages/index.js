import { Component } from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

import Page from '../components/Page'
import { setToken } from '../src/utils/github-token'
import App from '../src/App'
import AppContainer from '../components/AppContainer'

const primaryColor = '#344a5f'

const Input = styled.input`
  border-radius: 4px;
  border: 2px solid ${primaryColor};
  color: ${primaryColor};
  display: block;
  width: 100%;
  margin: 3px;
  padding: 5px;
`

const Form = styled.form`
  & > div {
    position: -webkit-sticky;
    position: sticky;
    top: 10px;
    background: white;
    border: 2px solid #f6f8fa;
    border-radius: 4px;
  }
`

const SvgLink = styled.a`
  display: block;
  background: white;
  border: 2px solid #f6f8fa;
  border-radius: 4px;

  img {
    width: 100%;
  }
`

const Submit = styled.input`
  display: block;
  color: white;
  background: #2ecc71;
  box-sizing: content-box;
  margin: 3px;
  margin-top: 15px;
  padding: 5px;
  border: 2px solid transparent;
  border-radius: 4px;
  width: 100%;

  :invalid & {
    pointer-events: none;
  }
`

const Header = styled.h2`color: ${primaryColor};`

const PreviewMarkdown = styled.textarea`
  display: block;
  border-radius: 4px;
  background: rgba(52, 74, 95, 0.05);
  border: none;
  padding: 10px;
  min-height: 128px;
  width: 100%;
`

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
        <Flex wrap align="flex-start" justify="space-around" pt={3} pb={3}>
          <Box pb={1}>
            <Form>
              <Flex column align="center" px={3} pb={2}>
                <Header>Generate SVG</Header>
                <Input
                  required
                  name="owner"
                  type="text"
                  value={owner}
                  onChange={this.handleChange}
                />
                <Input
                  required
                  name="name"
                  type="text"
                  value={name}
                  onChange={this.handleChange}
                />
                <Input
                  type="text"
                  value={access_token}
                  onChange={this.handleTokenChange}
                  placeholder="Personal Access Token"
                  title="Only needed for private repositories"
                />
                <Submit type="submit" value="Preview SVG" />
                <Header>Markdown</Header>
                <PreviewMarkdown
                  readonly
                  value={`[![Top Code Reviewers](https://top-github-code-reviewers.stipsan.io/${href}.svg)](https://top-github-code-reviewers.stipsan.io/${href})`}
                />
              </Flex>
            </Form>
          </Box>
          <Box>
            {dirty
              ? <AppContainer key={access_token} owner={owner} name={name} />
              : <SvgLink href={`${href}.svg`} target="_blank">
                  <img src={`${href}.svg`} />
                </SvgLink>}
          </Box>
        </Flex>
      </Page>
    )
  }
}
