import { Component, EventEmitter, Output } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
  loginError:string;

  @Output() messageEvent = new EventEmitter<string>();


  constructor(private http:HttpClient){
    this.LogedIn=false;
  }

  onSubmit(fEmail:string, fPassword:string) {

    this.postData={
      email:fEmail,
      password:fPassword
    }

    this.http.post<number>(this.ROOT_URL,this.postData).toPromise().then(data => {
      this.result=data;
      if(this.result>0){
        this.email=fEmail;
        this.LogedIn=true;
        this.loginError="";

        this.messageEvent.emit(this.email);


      }else{
        this.loginError="email lub hasło nieprawidłowe!"
      }
    });

  }
}


