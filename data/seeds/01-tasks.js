
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {task_desc: "make something", completed: 0, task_notes: 'note'},
        {task_desc: "break something", completed: 1, task_notes: 'note'},
        {task_desc: "shake something", completed: 1, task_notes: 'note'},
        {task_desc: "bake something", completed: 1, task_notes: 'note'}
      ]);
    });
};
