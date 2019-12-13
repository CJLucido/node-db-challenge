const express = require('express')

const router = express.Router()

const dbMethod = require('./projects-model')

 dbMethod.getResources().then(resources => {console.log('this is resources', resources)})

 dbMethod.getProjects().then(projects => {console.log('this is projects', projects)})

 dbMethod.getTasks().then(tasks => {console.log('this is tasks', tasks)})

 dbMethod.createProject(
     {project_name: 'whatever',
}).then(projects => {
    // for(i = 0; i< projects.length; i++){
    //     if(projects[i].completed == 0){
    //         return (()=>{
    //         projects[i].completed = "false"
    //         console.log('this is new project', projects)}
    //         )
    //     }else{
    //         return (()=>{
    //             projects[i].completed = "true"
    //             console.log('this is new project', projects)}
    //             )
    //     }
    // }
    console.log('this is new project', projects)})

dbMethod.createResource(
    {resource_name: 'sawzaw',


}).then(resource => {console.log('this is new resource', resource)})

dbMethod.createTask(
    {task_desc: 'ahhhhhh'


}).then(task => {console.log('this is new task', task)})


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

function changeValue(req, res, next){
    if(req.body.completed === 0){
        return "false"
    }else if(req.body.completed === 1){
        return "true"
    }else{
        null
    }
}


module.exports = router;