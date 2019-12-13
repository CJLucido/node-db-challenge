const express = require('express')

const router = express.Router()

const dbMethod = require('./projects-model')

 dbMethod.getResources().then(resources => {console.log('this is resources', resources)})

 dbMethod.getProjects().then(projects => {console.log('this is projects', projects)})

 dbMethod.getTasks().then(tasks => {console.log('this is tasks', tasks)})


module.exports = router;