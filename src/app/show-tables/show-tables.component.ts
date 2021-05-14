import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "../user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IBoard} from "../board";
import {IBoardUser} from "../board-user";
import {IUserWithToken} from "../user-with-token";

@Component({
  selector: 'app-show-tables',
  templateUrl: './show-tables.component.html',
  styleUrls: ['./show-tables.component.css']
})
export class ShowTablesComponent implements OnInit {
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/boards';
  readonly ADD_BOARD_URL = 'https://pl-paw-2021.herokuapp.com/boards/add';
  postData={};
  constructor(private http:HttpClient){
  }
  result:string;
  listOfBoards:IBoard[];
  @Input() userWithToken :IUserWithToken;

  ngOnInit(): void {

    this.getBoards();
  }

  test(value:string){
  console.log("clicked!"+value);
  }

  getBoards(){
    const headers = new HttpHeaders()
      .set("authorization",this.userWithToken.token);
    this.http.get<IBoard[]>(this.ROOT_URL,{headers:headers}).toPromise().then(data => {console.log(data);this.listOfBoards=data;});
  }

  addBoard(boardName:string){
const headers = new HttpHeaders()
      .set("authorization",this.userWithToken.token);
    this.postData={
      name:boardName,
      owner:{
        id:this.userWithToken.user.id,
      }};

    this.http.post(this.ADD_BOARD_URL,this.postData,{headers:headers}).subscribe(
        res => {
        this.getBoards();
        });

    }

  }


