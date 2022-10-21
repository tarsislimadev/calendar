const { ApplicationError } = require('/calendario/commons/errors')
const netPkg = require('net')
const { Buffer } = require('buffer')

const app = require('/calendario/app')

const LINE_BREAK = '\r\n'

const HttpRequest = function (str) {
  const self = this

  self.parseBody = (req = '\n\n{}') => {
    const [, body] = req.toString()
      .split(/\r?\n\r?\n/ig)
      .filter(f => f)

    return JSON.parse(body)
  }

  self.body = self.parseBody(str)

  self.parseHeaders = (req = '\n\n{}') => {
    const json = {}

    const [headers, ] = req.toString()
      .split(/\r?\n\r?\n/ig)
      .filter(f => f)

    headers.split(/\r?\n/ig)
      .map((line) => {
        const separator = ': '
        let [name, ...values] = line.split(separator)
        name = name.replace('X-PARAM-', '')
        json[name] = values.join(separator)
      })

    return json
  }

  self.headers = self.parseHeaders(str)

  self.query = {} // TODO

  self.url = '' // TODO
}

const HttpResponse = function () {
  const self = this

  self.config = {
    status_code: 200,
    status_message: 'OK',
    content_type: 'text/html',
    body: '',
  }

  self.error = (err) => {
    self.config.content_type = 'application/json'
    self.config.status_code = '403'
    self.config.status_message = 'Forbidden'

    const data = { stack: err?.stack }

    if (err instanceof ApplicationError) {
      self.config.status_code = err.status_code
      self.config.status_message = err.status_message
      // data.extras = err.extras
    }

    self.config.body = JSON.stringify({
      status: 'error',
      message: err.message,
      data,
    })

    return self
  }

  self.json = (data = {}) => {
    self.config.content_type = 'application/json'
    self.config.status_code = '200'
    self.config.status_message = 'OK'

    self.config.body = JSON.stringify({
      status: 'ok',
      message: null,
      data,
    })

    return self
  }

  self.toString = () => {
    const body = self.config.body.toString()
    const length = Buffer.from(body).length

    const resp = ([
      `HTTP/1.1 ${self.config.status_code} ${self.config.status_message}`,
      `Content-Type: ${self.config.content_type}`,
      `Content-Length: ${length}`,
      'Connection: close',
      'Access-Control-Allow-Origin: *',
      '',
      body,
    ].join(LINE_BREAK))

    return resp
  }
}

const server = netPkg.createServer((socket) => {
  socket.on('data', (chunk) => {
    const reqt = new HttpRequest(chunk.toString())

    try {
      const resp = new HttpResponse()
      socket.write(app(reqt, resp).toString())
    } catch (e) {
      const resp = new HttpResponse()
      resp.error(e)
      socket.write(resp.toString())
    }

  })
})

server.listen(80, () => console.log('listening'))
