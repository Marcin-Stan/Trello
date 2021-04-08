import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trello-frontend';
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/users';
  Users:User[];

  constructor(private http:HttpClient){}

  getUsers(){
    return this.http.get<User[]>(this.ROOT_URL);
  }
  fillUsers(){
    this.getUsers().subscribe(data =>{
      this.Users = data;
    });
  }

}
