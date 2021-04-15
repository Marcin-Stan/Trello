import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user:User;
  title = 'Trello';

  constructor(){
    this.user=new User();
  }

  receiveMessage($event){
    this.user=$event;
  }
}
