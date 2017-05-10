import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }  from './components/app/app.component';
import { AccountSelectorComponent } from './components/account_selector/account_selector.component';
import { AccountComponent } from './components/account/account.component';
import { StepComponent } from './components/step/step.component';
import { RecipientComponent } from './components/recipient/recipient.component';
import { RecipientSelectorComponent } from './components/recipient_selector/recipient_selector.component';
import {TransferComponent} from './components/transfer/transfer.component';
import {RecipientTabsComponent} from './components/recipient_tabs/recipient_tabs.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    AccountSelectorComponent,
    RecipientSelectorComponent,
    AccountComponent,
    RecipientComponent,
    StepComponent,
    TransferComponent,
    RecipientTabsComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
