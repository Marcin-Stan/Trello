import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from "./user";
import {IUserWithToken} from "./user-with-token";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userWithToken:IUserWithToken;
  title = 'Trello';
  LogedIn:boolean;

  constructor(){
    this.LogedIn=false;
  }

  receiveMessage($event){
    this.userWithToken=$event;
    this.LogedIn=true;
  }
}
