import { Component, EventEmitter } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email: string = "";
  password: string = "";
  UserId:number;
  result:number;
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/users/login';
  postData={};
  LogedIn:boolean;
  constructor(private http:HttpClient){
    this.LogedIn=false;
  }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  onSubmit(fEmail:string, fPassword:string) {
    this.postData={
      email:fEmail,
      password:fPassword
    }

    this.http.post<string>(this.ROOT_URL,this.postData).toPromise().then(data => {
      this.result=+data;
      console.log(this.result);
      if(this.result>0){
        this.email=fEmail;
        this.LogedIn=true;
        this.UserId=this.result;
      }
    });

  }
}


