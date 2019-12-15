const db = require('../data/db-config')

module.exports = {

    //functions for POSTs and GETs
    getResources,
    getProjects,
    getTasks,
    createProject,
    createResource,
    createTask,
    findById
}

function getResources(){
 return  db('resources')
    .select('*')
   
}

function getProjects(){ //don't really want to do this mapping on a list of all the results because of the cost to the db, it's ok to do it for a find by id but not here
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
    .leftJoin('projects', 'projects.task_id', 'tasks.id')
       .select(
            'tasks.id',
       'tasks.task_desc',
        //    'tasks.task_notes',
            'tasks.completed',
            'project_name',
           'project_desc'
       )

        .then(tasks => {
            return( tasks.map(task => {
    
              return  {
                    id: task.id,
                    task_desc: task.task_desc ? task.task_desc : null,
                    completed: Boolean(task.completed),
                    project_name: task.project_name ? task.project_name : "not assigned Project",
                    project_desc: task.project_desc ? task.project_desc : "not assigned Project"
                }
            }) )
        })
   }

   function findById(id){
    return db('projects')
            .select('*')
            .where({id})
            .first()
            .then(
                
               project => {
        
                  return  {
                        id: id, //removed project.
                       project_name: project.project_name,
                        project_desc: project.project_desc,
                        completed: Boolean(project.completed),
                        task_id: project.task_id
                    }
                }

            
            )
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
    
    return   db('tasks')
   
    .select('*'
        // 'projects.task_id',
        // 'tasks.id',
        // 'tasks.task_desc',
        // 'tasks.task_notes',
        // 'tasks.completed',
        // 'projects.project_name',
        // 'projects.project_desc'
    )
     .where({'tasks.id': id})
     .first()
//   .then(task => { console.log("this is find task",task)})

//         if(id == task.task_id){
//         return  {
//             id: task.task_id,
//             task_desc: task.task_desc,
//             completed: Boolean(task.completed),
//             project_name: task.project_name,
//             project_desc: task.project_desc
//         }
//  }

       
//                   }
//          )
    }

   function createProject(projectData){
    return db('projects')
    .insert(projectData, 'id') 
    .then(ids =>{
        const id = ids[0]
            console.log(id)
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
                console.log("this is taskdata id", id)
               return findTaskId(id)
            })
}