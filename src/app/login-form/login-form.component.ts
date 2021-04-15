import { Component, EventEmitter, Output } from "@angular/core";
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
  loginError:string;
  user:User;

  @Output() messageEvent = new EventEmitter<User>();


  constructor(private http:HttpClient){
    this.LogedIn=false;
    this.user=new User();
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

        this.user.id=this.result;
        this.user.email=this.email;
        this.user.password=fPassword;
        this.user.isLogedIn=true;

        this.messageEvent.emit(this.user);


      }else{
        this.loginError="email lub hasło nieprawidłowe!"
      }
    });

  }
}


