/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('table_name').del()
  await knex('table_name').insert([
    { id: 1, name: '', nickname: '', released: '', user_id: '' },
    { id: 2, name: '', nickname: '', released: '', user_id: '' },
    { id: 3, name: '', nickname: '', released: '', user_id: '' },
  ])
}
