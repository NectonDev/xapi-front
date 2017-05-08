import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }  from './components/app.component';
import { AccountSelectorComponent } from './components/account_selector.component';
import { AccountComponent } from './components/account.component';
import { StepComponent } from './components/step.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    AccountSelectorComponent,
    AccountComponent,
    StepComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
