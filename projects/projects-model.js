const db = require('../data/db-config')

module.exports = {

    //functions for POSTs and GETs
    getResources,
    getProjects,
    getTasks
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
       .select('*')
        .join('projects', 'task_id', 'tasks.id')
   }