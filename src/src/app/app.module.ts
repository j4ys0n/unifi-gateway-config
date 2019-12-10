import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {
  MatButtonModule,
  MatTableModule,
  MatSortModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatFormFieldModule
} from '@angular/material'

// services
import { ApiService } from './services/api.service'

// components
import { AppRoutingModule } from './app-routing.module'
import { HomeComponent } from './components/home/home.component'
import { RootComponent } from './components/root/root.component';
import { NatDialogComponent } from './components/nat-dialog/nat-dialog.component';
import { FirewallDialogComponent } from './components/firewall-dialog/firewall-dialog.component'

@NgModule({
  exports: [
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule
  ]
})
export class AppMaterialModule { }

@NgModule({
  declarations: [
    HomeComponent,
    RootComponent,
    NatDialogComponent,
    FirewallDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [ApiService],
  bootstrap: [RootComponent],
  entryComponents: [
    NatDialogComponent,
    FirewallDialogComponent
  ]
})
export class AppModule { }
