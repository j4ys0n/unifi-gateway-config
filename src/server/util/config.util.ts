import { GenericObject } from '../types/general.types'
import {
  Config,
  NatRule, NatRules,
  FirewallRule, FirewallRules
} from '../types/config.types'

export class ConfigUtil {
  constructor() {}

  parseConfig(config: any): Config {
    return {
      natRules: this.parseNatRules(config.service.nat.rule),
      firewallRules: this.parseFirewallRules(config.firewall.name.WAN_IN.rule)
    }
  }

  parseNatRules(input: GenericObject): NatRules {
    const keys = Object.keys(input)
    const rules: NatRules = {}

    keys.forEach((rule: string) => {
      const src = input[rule]
      rules[rule] = {
        key: rule,
        description: src.description,
        destination: src.destination,
        inboundInterface: src['inbound-interface'],
        insideAddress: src['inside-address'],
        outboundInterface: src['outbound-interface'],
        outsideAddress: src['outside-address'],
        source: src.source,
        log: src.log,
        protocol: src.protocol,
        type: src.type
      }
    })
    return rules
  }

  parseFirewallRules(input: GenericObject): FirewallRules {
    const keys = Object.keys(input)
    const rules: FirewallRules = {}

    keys.forEach((rule: string) => {
      const src = input[rule]
      rules[rule] = {
        key: rule,
        action: src.action,
        description: src.description,
        destination: {
          address: src.destination.address,
          port: src.destination.port.split(',').map((port: string): number => {
            return parseInt(port, 10)
          })
        },
        protocol: src.protocol,
        log: src.log
      }
    })
    return rules
  }

  updateNatRules(updated: NatRules, config: GenericObject): GenericObject {
    const keys = Object.keys(updated)
    keys.forEach(rule => {
      const updatedKeys = Object.keys(updated[rule])
      updatedKeys.forEach(uk => {
        // just be extra sure, we don't want to write blank/null/undefined values
        if (
          updated[rule][uk] !== '' &&
          updated[rule][uk] !== null &&
          updated[rule][uk] !== undefined
        ) {
          console.log('updating', uk)
          switch (uk) {
            case 'destination':
              config.service.nat.rule[rule][uk].address = updated[rule][uk].address
              if (updated[rule][uk].port !== undefined) {
                config.service.nat.rule[rule][uk].port = (<Array<number>>updated[rule][uk].port).join(',')
              }
              break
            case 'inboundInterface':
              config.service.nat.rule[rule]['inbound-interface'] = updated[rule][uk]
              break
            case 'insideAddress':
              config.service.nat.rule[rule]['inside-address'] = updated[rule][uk]
              break
            case 'outboundInterface':
              config.service.nat.rule[rule]['outbound-interface'] = updated[rule][uk]
              break
            case 'outsideAddress':
              config.service.nat.rule[rule]['outside-address'] = updated[rule][uk]
              break
            default:
              config.service.nat.rule[rule][uk] = updated[rule][uk]
              break
          }
        }
      })
    })
    return config
  }

  updateFirewallRules(updated: FirewallRules, config: GenericObject): GenericObject {
    const keys = Object.keys(updated)
    keys.forEach(rule => {
      const updatedKeys = Object.keys(updated[rule])
      updatedKeys.forEach(uk => {
        // just be extra sure, we don't want to write blank/null/undefined values
        if (
          updated[rule][uk] !== '' &&
          updated[rule][uk] !== null &&
          updated[rule][uk] !== undefined
        ) {
          console.log('updating', uk)
          console.log(updated[rule][uk])
          switch (uk) {
            case 'destination':
              config.firewall.name.WAN_IN.rule[rule][uk].address = updated[rule][uk].address
              if (updated[rule][uk].port !== undefined) {
                config.firewall.name.WAN_IN.rule[rule][uk].port = (<Array<number>>updated[rule][uk].port).join(',')
              }
              break
            default:
              config.firewall.name.WAN_IN.rule[rule][uk] = updated[rule][uk]
              break
          }
        }
      })
    })
    return config
  }
}
