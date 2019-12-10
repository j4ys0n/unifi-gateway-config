export type NatRuleForm = {
  key: string
  description: string
  destinationAddress: string
  destinationPort: string
  inboundInterface: string
  insideAddress: string
  outboundInterface: string
  outsideAddress: string
  source: string
  log: string
  protocol: string
  type: string
}

export type Destination = {
  address: string
  port?: Array<number> | string
}

export type AddressOnly = {
  address: string
}

export type NatRule = {
  key?: string
  description: string
  destination?: Destination
  inboundInterface?: string
  insideAddress?: AddressOnly
  outboundInterface?: string
  outsideAddress?: AddressOnly
  source?: AddressOnly
  log: string
  protocol: string
  type: string
}

export type FirewallRuleForm = {
  key: string
  action: string
  description: string
  destinationAddress: string
  destinationPort: string
  protocol: string
  log: string
}

export type FirewallRule = {
  key?: string
  action: string
  description: string
  destination: Destination
  protocol: string
  log: string
}

export type NatRules = {
  [key: string]: NatRule
}

export type FirewallRules = {
  [key: string]: FirewallRule
}

export type Config = {
  natRules: NatRules
  firewallRules: FirewallRules
}
