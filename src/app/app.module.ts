import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { AccountSelectorComponent } from './account-selector/account-selector.component';
import { FlagsDropdownComponent } from './flags-dropdown/flags-dropdown.component';
import { IbanComponent } from './iban/iban.component';
import { NewRecipientComponent } from './new-payee/new-payee.component';
import { PayeeComponent } from './payee/payee.component';
import { RecipientSelectorComponent } from './recipient-selector/recipient-selector.component';
import { StepComponent } from './step/step.component';
import { TransferComponent } from './transfer/transfer.component';
import { SmoothFadeDirective } from './smooth-fade.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsManagerComponent } from './tabs-manager/tabs-manager.component';
import { TabComponent } from './tab/tab.component';
import { CurrencySymbolsService } from './currency-symbols.service';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './popup.service';
import { PopupOptionComponent } from './popup-option/popup-option.component';
import { TransactionReviewComponent } from './transaction-review/transaction-review.component';
import { StepManagerComponent } from './step-manager/step-manager.component';
import {StepManagerService} from './step-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AccountSelectorComponent,
    FlagsDropdownComponent,
    IbanComponent,
    NewRecipientComponent,
    PayeeComponent,
    RecipientSelectorComponent,
    StepComponent,
    TransferComponent,
    SmoothFadeDirective,
    TabsManagerComponent,
    TabComponent,
    PopupComponent,
    PopupOptionComponent,
    TransactionReviewComponent,
    StepManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [
    CurrencySymbolsService,
    PopupService,
    StepManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
