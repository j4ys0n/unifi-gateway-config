import * as  express from 'express'
import { HttpServer } from './http.server'
import { HttpRoutes } from './http.routes'
import { Util } from '../util/general.util'
import { EndpointController } from '../controllers/endpoint.controller'
import { environment } from '../environment'

import { Route } from '../types/api.types'

export class API {
  private httpServer: HttpServer
  private apiRoutes: HttpRoutes
  private endpointController: EndpointController

  constructor(
    private port: number,
    private util: Util,
    private frontEndRoute: string,
    private frontEndPath: string
  ) {
    this.apiRoutes = new HttpRoutes()
  }

  public start(server: express.Application): Promise<any> {
    this.httpServer = new HttpServer(server, this.apiRoutes, this.util, this.frontEndRoute, this.frontEndPath)
    this.endpointController = new EndpointController(this.util)
    return this.httpServer.start(this.port, this.routes())
    .then((): Promise<any> => {
      this.util.log('api', 'info', 'api server listening on port ' + this.port)
      return new Promise((resolve, reject) => {
        if (environment.TEST) {
          resolve()
        }
      })
    });
  }

  private routes(): Array<Route> {
    return [
      {path: '/api/read-config', method: 'post', controller: this.endpointController.readConfig.bind(this.endpointController)},
      {path: '/api/update-config', method: 'post', controller: this.endpointController.updateConfig.bind(this.endpointController)}
    ]
  }
}
