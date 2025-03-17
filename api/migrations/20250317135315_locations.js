/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("locations", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.decimal("latitude", 10, 6).notNullable();
    table.decimal("longitude", 10, 6).notNullable();
    table.string("country").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("locations");
};
