import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {DefaultMainComponent} from './default-main/default-main.component';
import {ShowTablesComponent} from './show-tables/show-tables.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {ShowBoardComponent} from './show-board/show-board.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {ExploreBoardComponent} from './explore-board/explore-board.component';
import {NameChangeComponent} from "./name-change/name-change.component";
import {ChangeNameService} from "./change-name-service.service";
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    DefaultMainComponent,
    ShowTablesComponent,
    ShowBoardComponent,
    ExploreBoardComponent,
    NameChangeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
    MatCardModule

  ],
  providers: [ChangeNameService
  ],
  bootstrap: [AppComponent],
  exports: [NameChangeComponent]
})
export class AppModule {
}
