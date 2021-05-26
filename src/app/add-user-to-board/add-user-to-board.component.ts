import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, startWith} from "rxjs/operators";
import {IUserWithToken} from "../user-with-token";
import {IUser} from "../user";

@Component({
  selector: 'app-add-user-to-board',
  templateUrl: './add-user-to-board.component.html',
  styleUrls: ['./add-user-to-board.component.css']
})
export class AddUserToBoardComponent implements OnInit {
  readonly GET_NICKNAMES_URL = 'https://pl-paw-2021.herokuapp.com/users';
  readonly GET_USER_BY_ID='https://pl-paw-2021.herokuapp.com//users/getUserByDisplayName';

  myControl = new FormControl();
  nicknames:string[];
  filteredOptions: Observable<string[]>;
  constructor(private http: HttpClient) { }

  @Input() userWithToken :IUserWithToken;

  ngOnInit(): void {
    this.getNicknames();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.nicknames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  getNicknames(){
    const headers = new HttpHeaders()
      .set("authorization",this.userWithToken.token);
    this.http.get<string[]>(this.GET_NICKNAMES_URL,{headers:headers}).toPromise().then(data => {
      console.log("elo");
      this.nicknames = data;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }
  addUserToBoardUser(userName:string){
    console.log(userName);
    let params = new HttpParams();
    params = params.set("displayName", userName);
    const headers = new HttpHeaders()
      .set("authorization", this.userWithToken.token);
    const requestOptions = {
      headers: headers,
      params: params
    };
    let userToAdd;
    this.http.post<IUser>(this.GET_USER_BY_ID,requestOptions).subscribe(data=>{
      userToAdd=data;
      console.log(userToAdd.id);
    })
  }

}
