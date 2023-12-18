import * as Local from './local.js'

export const goTo = (page, data = null) => Local.set([page], data).finally(() => (window.location = (page)))

export const getData = () => Local.get([window.location.pathname])
