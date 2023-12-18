import * as Server from './server.js'

import * as Local from './local.js'

export const setOn = (on = true) => Local.set(['on'], on)

export const getOn = (def = false) => Local.get(['on'], def)

export const saveEvent = (data) => getOn().then((on) => on ? Server.saveEvent(data) : Local.replaceOrAdd(['events'], data, data?.id))

export const listEvents = (data) => getOn().then((on) => on ? Server.listEvents(data) : Local.get(['events'], []))
