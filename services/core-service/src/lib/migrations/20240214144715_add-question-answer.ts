import * as Knex from 'knex';
import { baseColumns } from "../migration-helpers/base-columns";

export const up = async (knex: Knex) => {
  await knex.schema.createTable("questions", (table) => {
    baseColumns(knex, table);
    table.string("question", 150).notNullable();
    table.jsonb("options").notNullable();
  });

  await knex.schema.createTable("answers", (table) => {
    baseColumns(knex, table);
    table.integer("question_id");
    table.foreign("question_id").references("questions.id");
    table.string("answer", 150).notNullable();
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable("questions");
  await knex.schema.dropTable("answers");
};
