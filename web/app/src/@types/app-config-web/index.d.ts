// AUTO GENERATED CODE
// Run app-config with 'generate' command to regenerate this file

import '@app-config/main';

export interface Config {
  /**
   * React App Webserver Port
   */
  appServerPort: number;
  /**
   * React App URL Without Port
   */
  appServerUrl: string;
  /**
   * React App URL With Port
   */
  webUrl: string;
}

// augment the default export from app-config
declare module '@app-config/main' {
  export interface ExportedConfig extends Config {}
}
