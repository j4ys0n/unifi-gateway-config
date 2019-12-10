import * as request from 'request';

import { HttpReqOptions } from '../types/general.types';

const LOG_LEVELS = {
  'debug': 0,
  'info': 1,
  'warn': 2,
  'error': 3
}

export class Util {
  constructor(
    public logLevel: number = 1
  ) {}

  public log(component: string, level: string, message: any) {
    if (LOG_LEVELS[level] >= this.logLevel) {
      const msg = {
        component: component,
        level: level,
        message: message
      }
      console.log(JSON.stringify(msg));
    }
  }

  public promisifyRequest(options: HttpReqOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      request(options, (err: any, response: any, body: any) => {
        if (err) {
          this.log('httpreq', 'error', err);
          reject(err);
        } else {
          resolve(body);
        }
      });
    });
  }
}
