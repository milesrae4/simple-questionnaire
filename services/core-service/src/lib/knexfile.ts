const { config, loadConfig } = require('@app-config/main');

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



