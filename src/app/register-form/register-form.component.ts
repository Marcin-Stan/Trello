import { Component, EventEmitter, Output } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  email: string = "";
  password: string = "";
  UserId:number;
  result:string;
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/users/register';
  postData={};
  LogedIn:boolean;
  loginError:string;
  postMessage:string;

  @Output() messageEvent = new EventEmitter<string>();


  constructor(private http:HttpClient){
    this.LogedIn=false;
  }

  onSubmit(fEmail:string, fPassword:string, fDisplayName) {
    this.postData={
      email:fEmail,
      password:fPassword,
      displayName:fDisplayName
    }

    this.http.post<string>(this.ROOT_URL,this.postData).toPromise().then(data => {
      this.result=data;
      console.log(data);
      if(this.result=="SUCCESS"){
        this.loginError="";
        this.postMessage="Dodano użytkownika "
        this.postMessage+=fDisplayName;
      }else{
        this.loginError="Błędne dane"
        this.postMessage=""
      }
    });

  }
}


