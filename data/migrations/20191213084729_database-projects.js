
exports.up = function(knex) {
//   CREATE TABLE resources (
// 	id integer PRIMARY KEY AUTOINCREMENT,
// 	resource_name varchar,
// 	resource_desc varchar
// );

// CREATE TABLE projects (
// 	id integer PRIMARY KEY AUTOINCREMENT,
// 	completed boolean,
// 	task_id integer,
// 	project_name integer,
// 	project_desc integer
// );

// CREATE TABLE tasks (
// 	id integer PRIMARY KEY AUTOINCREMENT,
// 	completed boolean,
// 	task_desc varchar,
// 	task_notes varchar
// );

// CREATE TABLE project_resources (
// 	project_id integer,
// 	rescource_id integer
// );
return knex.schema
.createTable('tasks', tbl => {
    tbl.increments();

    tbl.string('task_desc', 255)
        .notNullable()

    tbl.string('task_notes', 255)
       
    tbl.boolean('completed')
        .notNullable()
        .defaultTo(0)
})
.createTable('resources', tbl => {
    tbl.increments();

    tbl.string('resource_name', 255)
    .unique()
    .notNullable()

    tbl.string('resource_desc', 255)
})
.createTable('projects', tbl => {
    tbl.increments();

    tbl.string('project_name', 255)
        .notNullable()

    tbl.string('project_desc', 255)
        .notNullable()

    tbl.boolean('completed')
    .notNullable()
    .defaultTo(0)

    tbl.integer('task_id')
        .unsigned()
        .references('id')
        .inTable('tasks')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
})
.createTable('project_resources', tbl => {
    tbl.primary(['project_id', 'resource_id'])

    tbl.integer('project_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('projects')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE')

    tbl.integer('resource_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('resources')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE')
})



};

exports.down = function(knex) {
    return knex.schema
  .dropTableIfExists('project_resources')
  .dropTableIfExists('projects')
  .dropTableIfExists('resources')
  .dropTableIfExists('tasks')
};
