import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  email:string;
  title = 'Trello';
  LogedIn:boolean;

  constructor(){
    this.LogedIn=false;
  }

  receiveMessage($event){
    this.email=$event;
    this.LogedIn=true;
  }
}
