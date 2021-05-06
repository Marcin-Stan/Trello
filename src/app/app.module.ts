import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import { DefaultMainComponent } from './default-main/default-main.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    DefaultMainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
