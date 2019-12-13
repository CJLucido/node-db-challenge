const express = require('express')

const router = express.Router()

const dbMethod = require('./projects-model')

 dbMethod.getResources().then(resources => {console.log('this is resources', resources)})

 dbMethod.getProjects().then(projects => {console.log('this is projects', projects)})

 dbMethod.getTasks().then(tasks => {console.log('this is tasks', tasks)})

 dbMethod.createProject(
     {project_name: 'whatever',
 

}).then(projects => {console.log('this is new', projects)})

 router.get('/', (req, res) => {

    dbMethod.getProjects()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log('err projects', err)
            res.status(500).json({error: "Internal GET projects err"})
        })
 })

 router.get('/resources', (req, res) => {

    dbMethod.getResources()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(err => {
            console.log('err resources', err)
            res.status(500).json({error: "Internal GET resources err"})
        })
 })

 router.get('/tasks', (req, res) => {

    dbMethod.getTasks()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            console.log('err tasks', err)
            res.status(500).json({error: "Internal GET tasks err"})
        })
 })




module.exports = router;