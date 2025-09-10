/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('table_name').del()
  await knex('table_name').insert([
    { id: 1, nickname: 'Annie', sprite: '' },
    { id: 2, nickname: 'Aeron', sprite: '' },
    { id: 3, nickname: 'Kaylin', sprite: '' },
    { id: 4, nickname: 'Nixon', sprite: '' },
    { id: 5, nickname: 'Rena', sprite: '' },
  ])
}
