import { Component, EventEmitter, Output } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {IUser} from "../user";
import {map} from "rxjs/operators";
import {IUserWithToken} from "../user-with-token";
import {stringify} from "querystring";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {
user:IUser={email:"",password:"",id:0,displayName:""};
  userWithToken:IUserWithToken = {user: null, token: null};
  email: string = "";
  password: string = "";
  UserId:number;
  result:number;
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/login';
  readonly USER_DATA_URL= 'https://pl-paw-2021.herokuapp.com/users/getUserByEmail';
  postData={};
  LogedIn:boolean;
  loginError:string;
  authorization:string;



  @Output() messageEvent = new EventEmitter<IUserWithToken>();


  constructor(private http:HttpClient){
    this.LogedIn=false;

  }



  onSubmit(fEmail:string, fPassword:string) {

    this.postData={
      username:fEmail,
      password:fPassword
    }

    this.http.post(this.ROOT_URL,this.postData,{observe: 'response'}).subscribe(
      res => {
        console.log(res.headers.get("authorization"));
           this.authorization=res.headers.get("authorization");
        if(this.authorization==null){
          this.loginError="Bleeeee";
        }else{
          this.loginError="Jest git";

          const headers = new HttpHeaders()
            .set("authorization",res.headers.get("authorization"));

          let params = new HttpParams();
          params = params.set('email', fEmail);

          this.http.post<IUser>(this.USER_DATA_URL,params,{headers:headers}).subscribe(data=>{
            console.log(data.displayName);
            this.user.email=data.email;
            this.user.id=data.id;
            this.user.displayName=data.displayName;
            this.LogedIn=true;
            this.loginError="";
            this.userWithToken = {user: this.user,token:headers.get("Authorization")};
            this.messageEvent.emit(this.userWithToken);
          });
        }
      });



    /*



    if(this.result>0){





      }else{

      }
      console.log(data);
    }));

     */

  }
}


