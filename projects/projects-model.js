const db = require('../data/db-config')

module.exports = {

    //functions for POSTs and GETs
    getResources,
    getProjects,
    getTasks,
    createProject,
    createResource,
    createTask
}

function getResources(){
 return  db('resources')
    .select('*')
   
}

function getProjects(){
    return  db('projects')
       .select('*')
      
   }


   function getTasks(){
    return  db('tasks')
       .select(
           'tasks.id',
           'tasks.task_desc',
           'tasks.task_notes',
           'tasks.completed',
           'project_name',
           'project_desc'

       
       )
        .join('projects', 'task_id', 'tasks.id')
   }

   function findById(id){
    return db('projects')
            .select('*')
            .where({id})
            .first()
}

function findResourceId(id){
    return db('resources')
            .select('*')
            .where({id})
            .first()
}
function findTaskId(id){
    return db('tasks')
            .select('*')
            .where({id})
            .first()
}

   function createProject(projectData){
    return db('projects')
    .insert(projectData, 'id') 
    .then(ids =>{
        const id = ids[0]

       return findById(id)
    })
   }

   function createResource(resourceData){
    return db('resources')
            .insert(resourceData, 'id') 
            .then(ids =>{
                const id = ids[0]

               return findResourceId(id)
            })
}

function createTask(taskData){
    return db('tasks')
            .insert(taskData, 'id') 
            .then(ids =>{
                const id = ids[0]

               return findTaskId(id)
            })
}