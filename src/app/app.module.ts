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
import {SmoothFadeDirective} from './directives/smooth_fade.directive';
import {NewRecipientComponent} from './components/new_recipient/new_recipient.component';
import {FormsModule} from '@angular/forms';
import {IbanComponent} from './components/iban/iban.component';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    AccountSelectorComponent,
    RecipientSelectorComponent,
    AccountComponent,
    RecipientComponent,
    StepComponent,
    TransferComponent,
    NewRecipientComponent,
    IbanComponent,
    SmoothFadeDirective
  ],
  providers: [ HttpModule ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
