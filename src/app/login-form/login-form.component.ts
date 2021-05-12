import { Component, EventEmitter, Output } from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {IUser} from "../user";
import {map} from "rxjs/operators";

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
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/login';
  postData={};
  LogedIn:boolean;
  loginError:string;


  @Output() messageEvent = new EventEmitter<IUser>();


  constructor(private http:HttpClient){
    this.LogedIn=false;

  }



  onSubmit(fEmail:string, fPassword:string) {

    this.postData={
      username:fEmail,
      password:fPassword
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };
    this.http.post(this.ROOT_URL,this.postData,httpOptions).subscribe(
      res => {

        console.log(res.headers.keys());
      }
    );
    /*  if(this.result>0){
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
      console.log(data);
    }));

     */

  }
}


