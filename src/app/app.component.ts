import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trello-frontend';
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';
  posts:any;
  constructor(private http:HttpClient){}

  getPosts(){
    // @ts-ignore
    this.posts=this.http.get(this.ROOT_URL+'/posts');
  }
}
