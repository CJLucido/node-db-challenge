
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {resource_name: "wrench", resource_desc: 'make it'},
        {resource_name: "crowbar", resource_desc: 'shake it'},
        {resource_name: "hammer", resource_desc: 'break it'},
        {resource_name: "blow torch", resource_desc: 'bake it'}
      ]);
    });
};
