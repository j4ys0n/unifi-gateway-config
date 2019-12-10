import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import { NatRule } from '../../../../server/types/config.types'

@Component({
  selector: 'app-nat-dialog',
  templateUrl: './nat-dialog.component.html',
  styleUrls: ['./nat-dialog.component.scss']
})
export class NatDialogComponent implements OnInit {
  form: FormGroup

  key: string
  description: string
  destination: {
    address?: string
    port?: Array<number> | string
  }
  inboundInterface: string
  insideAddress: {
    address: string
  }
  outboundInterface: string
  outsideAddress: {
    address: string
  }
  source: {
    address: string
  }
  log: string
  protocol: string
  type: string

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: NatRule
  ) {
    this.key = data.key
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
    this.inboundInterface = data.inboundInterface
    if (data.insideAddress === undefined) {
      this.insideAddress = {
        address: ''
      }
    } else {
      this.insideAddress = {
        address: data.insideAddress.address || ''
      }
    }
    this.outboundInterface = data.outboundInterface
    if (data.outsideAddress === undefined) {
      this.outsideAddress = {
        address: ''
      }
    } else {
      this.outsideAddress = {
        address: data.outsideAddress.address || ''
      }
    }
    if (data.source === undefined) {
      this.source = {
        address: ''
      }
    } else {
      this.source = {
        address: data.source.address || ''
      }
    }
    this.log = data.log
    this.protocol = data.protocol
    this.type = data.type

    this.form = this.formBuilder.group({
      description: [this.description, Validators.required],
      destinationAddress: [this.destination.address],
      destinationPort: [this.destination.port],
      inboundInterface: [this.inboundInterface],
      insideAddress: [this.insideAddress.address],
      outboundInterface: [this.outboundInterface],
      outsideAddress: [this.outsideAddress.address],
      source: [this.source.address],
      log: [this.log],
      protocol: [this.protocol],
      type: [this.type]
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
