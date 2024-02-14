const { config, loadConfig } = require('@lcdev/app-config');

const loadAppConfig = async () => {
  await loadConfig({ directory: '../../' });
  const { ...connectionConfig } = config.database;

  return {
    client: "pg",
    connection: {
      ...connectionConfig,
    },
    migrations: {
      directory: "migrations",
      extension: "js",
      tableName: "migration",
    },
  };
}

module.exports = loadAppConfig();



