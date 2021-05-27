import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, startWith} from "rxjs/operators";
import {IUserWithToken} from "../user-with-token";
import {IUser} from "../user";
import {IUserWithBoardAndToken} from "../user-with-board-and-token";

@Component({
  selector: 'app-add-user-to-board',
  templateUrl: './add-user-to-board.component.html',
  styleUrls: ['./add-user-to-board.component.css']
})
export class AddUserToBoardComponent implements OnInit {
  readonly GET_NICKNAMES_URL = 'https://pl-paw-2021.herokuapp.com/users';
  readonly GET_USER_BY_ID='https://pl-paw-2021.herokuapp.com/users/getUserByDisplayName';
  readonly ADD_USER_TO_BOARDUSER ='https://pl-paw-2021.herokuapp.com/boardsUser/add';
  readonly CHECK_IS_OWNER='https://pl-paw-2021.herokuapp.com/boards/checkOwner'
  userIsOwner:boolean;
  myControl = new FormControl();
  nicknames:string[];
  filteredOptions: Observable<string[]>;
  constructor(private http: HttpClient) { }

  @Input() userWithBoardAndToken :IUserWithBoardAndToken;

  ngOnInit(): void {
    this.getNicknames();
    this.checkIsOwner();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.nicknames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  checkIsOwner(){
    const headers = new HttpHeaders()
      .set("authorization", this.userWithBoardAndToken.userWithToken.token);
    let postData={
      id:this.userWithBoardAndToken.board.id,
      owner:{
        id:this.userWithBoardAndToken.userWithToken.user.id
      }
    }
    this.http.post<boolean>(this.CHECK_IS_OWNER,postData,{headers:headers}).subscribe(res=>{
      console.log(res);
      if(res){
        this.userIsOwner=true;
      }else{
        this.userIsOwner=false;
      }
    })
  }

  getNicknames(){
    const headers = new HttpHeaders()
      .set("authorization",this.userWithBoardAndToken.userWithToken.token);
    this.http.get<string[]>(this.GET_NICKNAMES_URL,{headers:headers}).toPromise().then(data => {
      this.nicknames = data;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }
  addUserToBoardUser(userName:string){
    let params = new HttpParams();
    params = params.set("displayName", userName);
    const headers = new HttpHeaders()
      .set("authorization", this.userWithBoardAndToken.userWithToken.token);

    var userToAdd;
    this.http.post<IUser>(this.GET_USER_BY_ID,params,{headers:headers}).subscribe(data=>{
      userToAdd=data;
      let postData={
        id:0,
        board :{
          id:this.userWithBoardAndToken.board.id,
        },
        user:{
          id:userToAdd.id,
        }
      };
      this.http.post(this.ADD_USER_TO_BOARDUSER,postData,{headers:headers}).subscribe(res=>{
      });
    })
  }

}
