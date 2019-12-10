import * as  express from 'express';
import { API } from './api/api';
import { Util } from './util/general.util';
import { environment } from './environment';

export class App {
  private api: API;
  protected util: Util;
  protected server: express.Application = express();

  constructor() {
    let logLevel: number = 1;
    if (environment.LOG_LEVEL !== undefined) {
      logLevel = parseInt(environment.LOG_LEVEL, 10);
    }
    this.util = new Util(logLevel);
    let port: number = 8080;
    if (environment.API_PORT !== undefined) {
      port = parseInt(environment.API_PORT, 10);
    }
    this.api = new API(
      port, this.util,
      environment.FRONT_END_ROUTE,
      environment.FRONT_END_PATH
    );
  }

  public start(): Promise<any> {
    return this.api.start(this.server)
  }
}
