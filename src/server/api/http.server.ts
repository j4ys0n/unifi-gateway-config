import * as fs from 'fs'
import * as http from 'http'
import * as https from 'https'
import * as  express from 'express'
import * as bodyParser from 'body-parser'
import { HttpRoutes } from './http.routes'
import { Util } from '../util/general.util'
import { environment } from '../environment'

// const key = fs.readFileSync('/etc/letsencrypt/live/j4ys0n.com/privkey.pem', 'utf8')
// const cert = fs.readFileSync('/etc/letsencrypt/live/j4ys0n.com/cert.pem', 'utf8')
// const ca = fs.readFileSync('/etc/letsencrypt/live/j4ys0n.com/chain.pem', 'utf8')

// const CREDS = {
//   key,
//   cert,
//   ca
// }

export class HttpServer {

  constructor(
    private server: express.Application,
    private routes: HttpRoutes,
    private util: Util,
    private frontEndRoute: string | undefined,
    private frontEndPath: string | undefined
  ) {
    this.config()
    this.routes = new HttpRoutes()
  }

  private config(): void {
    //support application/json type post data (default limit is 100kb)
    this.server.use(bodyParser.json({limit: environment.PAYLOAD_LIMIT}))

    //support application/x-www-form-urlencoded post data (default limit is 100kb)
    this.server.use(bodyParser.urlencoded({limit: environment.PAYLOAD_LIMIT, extended: false}))

    this.util.log('httpserver', 'info', 'payload limit: ' + environment.PAYLOAD_LIMIT)

    //CORS
    this.server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    });

    if (this.frontEndRoute !== undefined && this.frontEndPath) {
      this.util.log('httpserver', 'info', 'front end path ' + __dirname + '/../../' + this.frontEndPath)
      this.util.log('httpserver', 'info', 'front end served at ' + this.frontEndRoute)
      this.server.use(this.frontEndRoute, express.static(this.frontEndPath, { dotfiles: 'allow' }))
    }
  }

  public start(port: number, routes: Array<any>): Promise<any> {
    this.routes.setRoutes(this.server, routes)
    return new Promise((resolve, reject) => {
      // this.server.listen(port, () => {
      //   resolve()
      // });
      // https.createServer(CREDS, this.server)
      // .listen(port, () => {
      //   resolve()
      // })
      http.createServer(this.server)
      .listen(port, () => {
        resolve()
      })
    });
  }
}
