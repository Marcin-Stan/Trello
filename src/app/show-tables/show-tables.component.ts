import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "../user";
import {HttpClient} from "@angular/common/http";
import {IBoard} from "../board";
import {IBoardUser} from "../board-user";

@Component({
  selector: 'app-show-tables',
  templateUrl: './show-tables.component.html',
  styleUrls: ['./show-tables.component.css']
})
export class ShowTablesComponent implements OnInit {
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/boardsUser/getByUser';
  constructor(private http:HttpClient){
  }
  result:string;
  listOfBoards:IBoardUser[];
  @Input() user :IUser;
  ngOnInit(): void {
    this.http.post<IBoardUser[]>(this.ROOT_URL,this.user).toPromise().then(data => {

      console.log(data);
      this.listOfBoards=data;


    });

  }
}
