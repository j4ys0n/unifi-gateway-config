import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { MatTableDataSource } from '@angular/material'
import { MatDialog, MatDialogConfig } from "@angular/material"

import { ApiService } from '../../services/api.service'

import { NatDialogComponent } from '../nat-dialog/nat-dialog.component'
import { FirewallDialogComponent } from '../firewall-dialog/firewall-dialog.component'

import {
  Config, Destination, AddressOnly,
  NatRule, NatRules, NatRuleForm,
  FirewallRule, FirewallRules, FirewallRuleForm
} from '../../../../server/types/config.types'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('configPathInput', {static: false}) configPathInput: ElementRef

  natColumns: Array<string> = ['description', 'type', 'protocol', 'insideAddress', 'outsideAddress', 'source', 'destination']
  configNatDataSource = new MatTableDataSource()

  firewallColumns: Array<string> = ['description', 'action', 'destination', 'protocol']
  configFirewallDataSource = new MatTableDataSource()

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) {  }

  ngAfterViewInit() {
    this.getConfig()
  }

  getConfig() {
    const subscription = this.apiService.sendData(
      'http://10.1.1.39:8080/api/read-config',
      {path: this.configPathInput.nativeElement.value}
    ).subscribe((result: Config) => {
      console.log(result)
      this.configNatDataSource.data = this.hashToArray(result.natRules)
      this.configFirewallDataSource.data = this.hashToArray(result.firewallRules)
      subscription.unsubscribe()
    })
  }

  newNatRule() {
    const blank: NatRule = {
      description: '',
      destination: {
        address: '',
        port: []
      },
      inboundInterface: '',
      insideAddress: {
        address: ''
      },
      outboundInterface: '',
      outsideAddress: {
        address: ''
      },
      source: {
        address: ''
      },
      log: '',
      protocol: '',
      type: ''
    }
    this.editNatRule(blank)
  }

  newFirewallRule() {
    const blank: FirewallRule = {
      action: 'deny',
      description: '',
      destination: {
        address: '',
        port: []
      },
      protocol: '',
      log: 'enable'
    }
    this.editFirewallRule(blank)
  }

  editNatRule(rule: NatRule) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true
    dialogConfig.data = rule
    const dialogRef = this.dialog.open(NatDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((editedRule: NatRuleForm) => {
      if (editedRule !== undefined) {
        const mapped = this.mapNatFormResponse(editedRule)
        const natRules: NatRules = {}
        natRules[editedRule.key] = mapped
        this.updateConfig({natRules})
      }
    })
  }

  editFirewallRule(rule: FirewallRule) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true
    dialogConfig.data = rule
    const dialogRef = this.dialog.open(FirewallDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((editedRule: FirewallRuleForm) => {
      if (editedRule !== undefined) {
        const mapped = this.mapFirewallFormResponse(editedRule)
        const firewallRules: FirewallRules = {}
        firewallRules[editedRule.key] = mapped
        this.updateConfig({firewallRules})
      }
    })
  }

  private updateConfig(updated: {natRules?: NatRules, firewallRules?: FirewallRules}) {
    const subscription = this.apiService.sendData(
      'http://10.1.1.39:8080/api/update-config',
      {
        path: this.configPathInput.nativeElement.value,
        natRules: updated.natRules,
        firewallRules: updated.firewallRules
      }
    ).subscribe((result: Config) => {
      console.log(result)
      this.getConfig()
      subscription.unsubscribe()
    })
  }

  private hashToArray(source: NatRules | FirewallRules): Array<NatRule> | Array<FirewallRule> {
    const keys = Object.keys(source)
    const natRules: Array<any> = []
    keys.forEach(rule => {
      natRules.push(source[rule])
    })
    return natRules
  }

  private mapNatFormResponse(edited: NatRuleForm): NatRule {
    let destination: Destination
    if (edited.destinationAddress !== '') {
      destination = {
        address: edited.destinationAddress
      }
      if (typeof edited.destinationPort === 'string') {
        // the form returns a string of comma delimited numbers as a string. for now.
        destination.port = edited.destinationPort.split(',').map(p => parseInt(p, 10))
      }
      if (typeof edited.destinationPort === 'object') {
        // this will be an array, either empty or containing numbers if untouched
        if ((<Array<number>>edited.destinationPort).length > 0) {
          destination.port = edited.destinationPort
        }
      }
    }

    let insideAddress: AddressOnly
    if (edited.insideAddress !== '') {
      insideAddress = {
        address: edited.insideAddress
      }
    }

    let outsideAddress: AddressOnly
    if (edited.outsideAddress !== '') {
      outsideAddress = {
        address: edited.outsideAddress
      }
    }

    let source: AddressOnly
    if (edited.source !== '') {
      source = {
        address: edited.source
      }
    }

    const mapped: NatRule = {
      description: (edited.description !== '') ? edited.description : undefined,
      destination: destination,
      inboundInterface: (edited.inboundInterface !== '') ? edited.inboundInterface : undefined,
      insideAddress: insideAddress,
      outboundInterface: (edited.outboundInterface !== '') ? edited.outboundInterface : undefined,
      outsideAddress: outsideAddress,
      source: source,
      log: (edited.log !== '') ? edited.log : undefined,
      protocol: (edited.protocol !== '') ? edited.protocol : undefined,
      type: (edited.type !== '') ? edited.type : undefined
    }
    return mapped
  }

  private mapFirewallFormResponse(edited: FirewallRuleForm): FirewallRule {
    let destination: Destination
    if (edited.destinationAddress !== '') {
      destination = {
        address: edited.destinationAddress
      }
      if (typeof edited.destinationPort === 'string') {
        // the form returns a string of comma delimited numbers as a string. for now.
        destination.port = edited.destinationPort.split(',').map(p => parseInt(p, 10))
      }
      if (typeof edited.destinationPort === 'object') {
        // this will be an array, either empty or containing numbers if untouched
        if ((<Array<number>>edited.destinationPort).length > 0) {
          destination.port = edited.destinationPort
        }
      }
    }
    const mapped: FirewallRule = {
      action: edited.action,
      description: edited.description,
      destination: destination,
      protocol: edited.protocol,
      log: edited.log
    }
    return mapped
  }
}
