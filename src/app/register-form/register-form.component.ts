import {Component, EventEmitter, Output} from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  email: string = "";
  password: string = "";
  UserId: number;
  result: string;
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/register';
  readonly ROOT_URL_authorisis = 'https://pl-paw-2021.herokuapp.com/addAuthorities';

  postData = {};
  registered: boolean;
  loginError: string;
  postMessage: string;

  @Output() messageEvent = new EventEmitter<string>();


  constructor(private http: HttpClient) {
    this.registered = false;
  }

  onSubmit(fEmail: string, fPassword: string, fDisplayName) {
    this.postData = {
      username: fEmail,
      password: fPassword
    }

    this.http.post<string>(this.ROOT_URL, this.postData).subscribe(data => {
      console.log(data);
      let params = new HttpParams();
      params = params.set('username', fEmail);
      this.http.post(this.ROOT_URL_authorisis, params).subscribe(data => {
        }
      );
      this.registered = true;
      this.loginError = "";
      this.postMessage = "Dodano użytkownika "
      this.postMessage += fDisplayName;

    });

  }
}


