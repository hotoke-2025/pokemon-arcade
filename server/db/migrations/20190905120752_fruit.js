/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('pokemon', (table) => {
    table.increments('id')
    table.string('name')
    table.string('owner').defaultTo(null)
  })
}

export async function down(knex) {
  return knex.schema.dropTable('pokemon')
}
