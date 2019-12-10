import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import { FirewallRule } from '../../../../server/types/config.types'

@Component({
  selector: 'app-firewall-dialog',
  templateUrl: './firewall-dialog.component.html',
  styleUrls: ['./firewall-dialog.component.scss']
})
export class FirewallDialogComponent implements OnInit {
  form: FormGroup

  key: string
  action: string
  description: string
  destination: {
    address?: string
    port?: Array<number> | string
  }
  log: string
  protocol: string

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FirewallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: FirewallRule
  ) {
    this.key = data.key
    this.action = data.action
    this.description = data.description
    if (data.destination === undefined) {
      this.destination = {
        address: '',
        port: []
      }
    } else {
      this.destination = {
        address: data.destination.address || '',
        port: data.destination.port || []
      }
    }
    this.log = data.log
    this.protocol = data.protocol

    this.form = this.formBuilder.group({
      action: [this.action],
      description: [this.description, Validators.required],
      destinationAddress: [this.destination.address],
      destinationPort: [this.destination.port],
      log: [this.log],
      protocol: [this.protocol]
    })
  }

  ngOnInit() {
  }

  close(rule?: any) {
    this.dialogRef.close(rule)
  }

  save() {
    this.close({...{key: this.key}, ...this.form.value})
  }

}
