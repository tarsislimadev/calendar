const tasksIndex = require('/calendario/commons/db').in('tasks')

module.exports = (_, res) => res.json({ list: tasksIndex.listJSON() })
