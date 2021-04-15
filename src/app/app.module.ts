import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import {LoginFormComponent} from './login-form/login-form.component';
import { User } from './user';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
