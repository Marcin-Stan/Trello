import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from "./user";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
user:IUser;
  email:string;
  title = 'Trello';
  LogedIn:boolean;

  constructor(){
    this.LogedIn=false;
  }

  receiveMessage($event){
    this.user=$event;
    this.LogedIn=true;
  }
}
