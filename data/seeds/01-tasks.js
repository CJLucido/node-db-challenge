
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {task_desc: "make some thing", completed: 0, task_notes: 'note'},
        {task_desc: "break some thing", completed: 1, task_notes: 'note'},
        {task_desc: "shake some thing", completed: 1, task_notes: 'note'}
      ]);
    });
};
