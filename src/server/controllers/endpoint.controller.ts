import { Request, Response } from 'express'
import { Util } from '../util/general.util'
import { ConfigUtil } from '../util/config.util'
import { FileUtil } from '../util/file.util'

import { GenericObject } from '../types/general.types'
import { NatRules, FirewallRules } from '../types/config.types'

export class EndpointController {
  private fileUtil: FileUtil = new FileUtil()
  private configUtil: ConfigUtil = new ConfigUtil()
  private config: GenericObject
  constructor(
    private util: Util
  ) {}

  public readConfig(req: Request, res: Response): any {
    const path = req.body.path
    this.fileUtil.readFile(path)
    .then((config: any) => {
      this.config = JSON.parse(config)
      console.log(this.config)
      res.json(this.configUtil.parseConfig(this.config))
    })
  }

  public updateConfig(req: Request, res: Response): any {
    const path: string = req.body.path
    const natRules: NatRules = req.body.natRules
    const firewallRules: FirewallRules = req.body.firewallRules
    console.log(this.config)
    if (natRules !== undefined) {
      this.config = this.configUtil.updateNatRules(natRules, this.config)
    }
    if (firewallRules !== undefined) {
      this.config = this.configUtil.updateFirewallRules(firewallRules, this.config)
    }

    this.writeConfig(path, this.config)
    .then(response => {
      res.json(response)
    })
    // res.json(this.config)
  }

  private writeConfig(path: string, config: GenericObject): Promise<any> {
    return this.fileUtil.writeFile(path, JSON.stringify(config))
    .then((): Promise<any> => {
      return Promise.resolve({success: true})
    })
    .catch((err) => {
      return Promise.resolve({success: false, error: err})
    })
  }
}
