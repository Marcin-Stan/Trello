import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {ShowCommentsComponent} from "./show-comments/show-comments.component";
import {IUserWithBoardAndToken} from "./user-with-board-and-token";
import {IComment} from "./comment";

@Injectable()
export class ShowCommentsService {

  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<ShowCommentsComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(ShowCommentsComponent, {
      data: {
        cancelText: options.cancelText,
        confirmText: options.confirmText,
        card: options.card,
        userWithBoardAndToken:options.userWithBoardAndToken
      }
    });
  }

  public confirmed(): Observable<any> {

    return this.dialogRef.afterClosed().pipe(take(1), map(data => {
        return data;
      }
    ));
  }
}
