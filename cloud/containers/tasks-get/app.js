const tasksIndex = require('/agenda/commons/db').in('tasks')

module.exports = ({ body: { _id } }, res) => res.json({ task: tasksIndex.selectById(_id) })
