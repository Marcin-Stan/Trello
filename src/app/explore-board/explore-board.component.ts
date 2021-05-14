import {Component, Input, OnInit} from '@angular/core';
import {IBoard} from "../board";
import {IUserWithBoardAndToken} from "../user-with-board-and-token";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IList} from "../list";

@Component({
  selector: 'app-explore-board',
  templateUrl: './explore-board.component.html',
  styleUrls: ['./explore-board.component.css']
})
export class ExploreBoardComponent implements OnInit {
  @Input() userWithBoardAndToken:IUserWithBoardAndToken;
  readonly ROOT_URL = 'https://pl-paw-2021.herokuapp.com/list/getAll';
  lists:IList[];

  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    const headers = new HttpHeaders()
      .set("authorization",this.userWithBoardAndToken.userWithToken.token);
    this.http.post<IList[]>(this.ROOT_URL,this.userWithBoardAndToken.board,{headers:headers}).subscribe(data=>{
      this.lists=data;
      }

    )
  }


}
