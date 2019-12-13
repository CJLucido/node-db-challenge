
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {project_name: "invent", project_desc: 'help the world', completed: 0, task_id: 1},
        {project_name: "prevent", project_desc: 'stop a catastrophe', completed: 2, task_id: 2},
        {project_name: "intent", project_desc: 'do nothing but talk', completed: 3, task_id: 3}
      ]);
    });
};
