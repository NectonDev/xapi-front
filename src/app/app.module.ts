import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { AccountSelectorComponent } from './account-selector/account-selector.component';
import { FlagsDropdownComponent } from './flags-dropdown/flags-dropdown.component';
import { IbanComponent } from './iban/iban.component';
import { NewRecipientComponent } from './new-recipient/new-recipient.component';
import { RecipientComponent } from './recipient/recipient.component';
import { RecipientSelectorComponent } from './recipient-selector/recipient-selector.component';
import { StepComponent } from './step/step.component';
import { TransferComponent } from './transfer/transfer.component';
import { SmoothFadeDirective } from './smooth-fade.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsManagerComponent } from './tabs-manager/tabs-manager.component';
import { TabComponent } from './tab/tab.component';
import { CurrencySymbolsService } from './currency-symbols.service';
import {CurrencyFlagsService} from './currency-flags.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AccountSelectorComponent,
    FlagsDropdownComponent,
    IbanComponent,
    NewRecipientComponent,
    RecipientComponent,
    RecipientSelectorComponent,
    StepComponent,
    TransferComponent,
    SmoothFadeDirective,
    TabsManagerComponent,
    TabComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [
    CurrencySymbolsService,
    CurrencyFlagsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
