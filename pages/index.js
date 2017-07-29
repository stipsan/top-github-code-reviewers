import { Component } from 'react'
import queryString from 'query-string'

export default class Index extends Component {
  static getInitialProps({ req }) {
    if (req) {
      // Runs only on the server
      const { access_token, owner, name } = req.query
      return { access_token, owner, name }
    }

    // Runs only in the client
    // eslint-disable-next-line no-restricted-globals
    const { access_token, owner, name } = queryString.parse(location.search)
    return { access_token, owner, name }
  }

  render() {
    const { access_token, owner, name } = this.props
    return (
      <div>
        Usage instructions will appear here, soonish.
        <img
          src={`/svg?${queryString.stringify({ access_token, owner, name })}`}
        />
        <img src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/apiary.svg" />
      </div>
    )
  }
}
