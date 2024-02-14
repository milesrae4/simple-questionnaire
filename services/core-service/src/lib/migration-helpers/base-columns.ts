import * as Knex from "knex";

// NB: this is used in migrations so please don't edit it!
export const baseColumns = (knex: Knex, table: Knex.TableBuilder) => {
  table.increments("id").primary();

  table.dateTime("insert_datetime").defaultTo(knex.fn.now()).notNullable();
};
