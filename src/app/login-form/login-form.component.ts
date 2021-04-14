import { Component, EventEmitter } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { User } from '../user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email: string = "";
  password: string = "";
  result:string;
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/users/login';
  postData={};
  LogedIn:boolean;
  constructor(private http:HttpClient){
    this.LogedIn=false;
  }


  onSubmit(fEmail:string, fPassword:string) {
    this.postData={
      email:fEmail,
      password: fPassword
    }
    this.http.post<string>(this.ROOT_URL,this.postData).toPromise().then(data => {
      this.result=data
      if(this.result=="SUCCESS"){
        this.email=fEmail;
        this.LogedIn=true;
      }
    });

  }
}


