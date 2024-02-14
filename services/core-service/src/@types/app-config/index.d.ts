// AUTO GENERATED CODE
// Run app-config with 'generate' command to regenerate this file

import '@app-config/main';

export interface Config {
  app: App;
  database: Database;
  webServer: WebServer;
}

export interface App {
  /**
   * The Base URL Website for api requests
   */
  baseUrl: string;
}

export interface Database {
  /**
   * Database name
   */
  database: string;
  /**
   * Whether we're in debug mode
   */
  debug?: boolean;
  /**
   * Hostname of the database server
   */
  host: string;
  /**
   * Database password
   */
  password: string;
  /**
   * Port of the database server
   */
  port: number;
  /**
   * Database user
   */
  user: string;
}

export interface WebServer {
  /**
   * List of allowed origins for CORS. Include '*' to allow all
   */
  allowedOrigins: string[];
  /**
   * Port that the web server will listen on
   */
  port: number;
}

// augment the default export from app-config
declare module '@app-config/main' {
  export interface ExportedConfig extends Config {}
}
