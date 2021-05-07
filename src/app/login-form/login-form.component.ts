import { Component, EventEmitter, Output } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUser} from "../user";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
user:IUser={email:"",password:"",id:0};
  email: string = "";
  password: string = "";
  UserId:number;
  result:number;
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/users/login';
  postData={};
  LogedIn:boolean;
  loginError:string;

  @Output() messageEvent = new EventEmitter<IUser>();


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
        this.user.email=fEmail;
        this.user.password=fPassword;
        this.user.id=this.result;
        this.email=fEmail;
        this.LogedIn=true;
        this.loginError="";

        this.messageEvent.emit(this.user);


      }else{
        this.loginError="email lub hasło nieprawidłowe!"
      }
    });

  }
}


