import Knex from 'knex';

export async function up(knev: Knex) {
  return knev.schema.createTable('point_items', (table) => {
    table.increments('id').primary();
    table.integer('point_id').notNullable().references('id').inTable('points');
    table.integer('item_id').notNullable().references('id').inTable('items');
  });
}

export async function down(knev: Knex) {
  return knev.schema.dropTable('point_items');
}
