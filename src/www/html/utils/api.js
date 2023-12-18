import * as Server from './server.js'

import * as Local from './local.js'

export const setOn = (on = true) => Local.set(['on'], on)

export const getOn = () => Local.get(['on'], false)

export const saveEvent = (data) => getOn() ? Server.saveEvent(data) : Local.add(['events'], data) 
