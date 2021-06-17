import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ICard} from "../card";
import {IUserWithBoardAndToken} from "../user-with-board-and-token";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IComment} from "../comment";


@Component({
  selector: 'app-show-comments',
  templateUrl: './show-comments.component.html',
  styleUrls: ['./show-comments.component.css']
})
export class ShowCommentsComponent implements OnInit {

  readonly GET_COMMENTS = 'https://pl-paw-2021.herokuapp.com/comment/getAllCommentByCard';

  constructor(private http: HttpClient,@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    card: ICard,
    userWithBoardAndToken:IUserWithBoardAndToken
  }, private mdDialogRef: MatDialogRef<ShowCommentsComponent>) {
  }
  comments:IComment[];


  getCommentsForCard(card:ICard){
    const headers = new HttpHeaders()
      .set("authorization", this.data.userWithBoardAndToken.userWithToken.token);
    this.http.post<IComment[]>(this.GET_COMMENTS, card, {headers:headers}).subscribe(res => {
      console.log(res);
      this.comments=res;
    })

  }


  ngOnInit(): void {
    this.getCommentsForCard(this.data.card);
  }

  public cancel() {
    this.mdDialogRef.close();
  }

  public close() {
    this.mdDialogRef.close();
  }

  public confirm() {
    this.mdDialogRef.close();
  }

}
