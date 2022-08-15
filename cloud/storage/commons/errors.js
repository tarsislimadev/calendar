
class ApplicationError extends Error {
  constructor(message, code, extras = {}) {
    super(message)
    this.status_code = code
    this.status_message = this.parseStatusMessage(code)
    this.extras = extras
  }

  parseStatusMessage(code) {
    switch (code.toString()) {
      case '403': return 'Forbidden';
    }
  }
}

class DuplicatedError extends ApplicationError {
  constructor(message, extras = {}) {
    super(message || 'Can not duplicate this item.', '403', extras)
  }
}

class NotFoundError extends ApplicationError {
  constructor(message, extras = {}) {
    super(message || 'Not found item.', '404', extras)
  }
}

module.exports = {
  ApplicationError,
  DuplicatedError,
  NotFoundError,
}
