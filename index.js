/* eslint-disable prefer-arrow-callback, func-names */

const path = require('path')
const express = require('express')
const helmet = require('helmet')
const fs = require('fs')
const crypto = require('crypto')
require('dotenv').config()

const app = express()
app.use(helmet())

const generateCsp = () => {
  const hash = crypto.createHash('sha256')

  const {
    REACT_APP_API_BASE_URL,
    REACT_APP_OPENWEATHER_API_KEY,
    REACT_APP_OPENWEATHER_API_BASEURL,
    REACT_APP_ICON_URL,
  } = process.env

  return `default-src 'self'; img-src 'self'; child-src 'none'; connect-src ${REACT_APP_API_BASE_URL} ${REACT_APP_OPENWEATHER_API_KEY} ${REACT_APP_OPENWEATHER_API_BASEURL} ${REACT_APP_ICON_URL} 'self'; font-src https://fonts.gstatic.com https://fonts.googleapis.com 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'sha256-${hash.digest(
    'base64',
  )}' 'self' 'unsafe-inline' ;`
}

app.use(function (req, res, next) {
  res.set('Content-Security-Policy', generateCsp())
  res.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate')
  next()
})

const PORT = process.env.PORT || 3000
const hostname = '0.0.0.0'

const { log } = console

const compressions = [
  {
    encoding: 'br',
    extension: 'br',
  },
  {
    encoding: 'gzip',
    extension: 'gz',
  },
]

const serveCompressed = (contentType) => (req, res, next) => {
  const acceptedEncodings = req.acceptsEncodings()
  // use first compression which is supported
  // and where file exists
  const compression = compressions.find(
    (comp) =>
      acceptedEncodings.indexOf(comp.encoding) !== -1 &&
      fs.existsSync(`./build/${req.url}.${comp.extension}`),
  )

  if (compression) {
    req.url = `${req.url}.${compression.extension}`
    res.set('Content-Encoding', compression.encoding)
    res.set('Content-Type', contentType)
  }

  next()
}

app.get('*.js', serveCompressed('text/javascript'))
app.use(express.static(`${__dirname}/build`))

app.get('*', function (req, res) {
  return res.sendFile(path.resolve(`${__dirname}/build`, 'index.html'))
})

app.listen(PORT, hostname, function () {
  log(`Node Server Running on ${hostname}:${PORT}`)
})
