import * as  express from 'express';

import { Route } from '../types/api.types';

export class HttpRoutes {
  constructor() {}

  setRoutes(server: express.Application, routes: Array<Route>): void {
    routes.forEach((route: Route) => {
      server.route(route.path)[route.method](route.controller)
    })
  }
}
