import * as Knex from "knex";
import {
  knexSnakeCaseMappers,
  Model,
  Transaction,
  transaction,
} from "objection";
import * as path from "path";

export { Knex, Model, Transaction as ObjectionTransaction, transaction };

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  debug?: boolean;
}

export const migrationsDir = path.join(__dirname, "..", "..", "dist", "lib", "migrations");
export const migrationsSourceDir = path.join(
  __dirname,
  "migrations"
);

export enum Knexion {
  Default = "default",
}

const knexions: { [key: string]: Knex } = {};

export const getKnex = (name: Knexion = Knexion.Default): Knex => {
  if (!knexions[name]) {
    throw new Error(
      `Called getKnex(${name}) without that connection being initialized`
    );
  }

  return knexions[name];
};

export const connect = (
  config: DatabaseConfig,
  enableSnakeCaseProperties = false,
  name = "default"
): Knex => {
  const { debug, ...connectionConfig } = config;

  knexions[name] = Knex({
    client: "postgres",
    connection: {
      ...connectionConfig,
    },
    migrations: {
      directory: migrationsDir,
      extension: "js",
      tableName: "migration",
    },
    ...(enableSnakeCaseProperties ? knexSnakeCaseMappers() : undefined),
  });

  return knexions[name];
};