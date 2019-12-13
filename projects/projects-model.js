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
       .then(projects => {
        return( projects.map(project => {

          return  {
                id: project.id,
               project_name: project.project_name,
                project_desc: project.project_desc,
                completed: Boolean(project.completed),
                task_id: project.task_id
            }
        }) )
    })
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
        .then(tasks => {
            return( tasks.map(task => {
    
              return  {
                    id: task.id,
                    task_desc: task.task_desc,
                    completed: Boolean(task.completed),
                    project_name: task.project_name,
                    project_desc: task.project_desc
                }
            }) )
        })
   }

   function findById(id){
    return db('projects')
            .select('*')
            .where({id})
            .first()
            .then(project => {
               project => {
        
                  return  {
                        id: project.id,
                       project_name: project.project_name,
                        project_desc: project.project_desc,
                        completed: Boolean(project.completed),
                        task_id: project.task_id
                    }
                }
            })
            //.update('complete',  Boolean())
            // .where({complete: 1})
            // .update({complete: true})
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
            .then(task => {
           
                  return  {
                        id: task.id,
                        task_desc: task.task_desc,
                        completed: Boolean(task.completed),
                        project_name: task.project_name,
                        project_desc: task.project_desc
                    }
               
            })

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