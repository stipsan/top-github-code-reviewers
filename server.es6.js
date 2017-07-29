const express = require('express')
const next = require('next-react-fiber-fork')
const ssrSvg = require('./ssr-svg').default

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/test', (req, res) => {
    res.set('Content-Type', 'image/svg+xml')
    return res.send(new Buffer('<p>some html</p>'))
  })

  server.get('/svg', ssrSvg())

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})