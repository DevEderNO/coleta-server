import Knex from 'knex';

export async function up(knev: Knex) {
  return knev.schema.createTable('items', (table) => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
}

export async function down(knev: Knex) {
  return knev.schema.dropTable('items');
}
