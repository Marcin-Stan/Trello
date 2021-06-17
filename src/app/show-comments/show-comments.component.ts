import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-show-comments',
  templateUrl: './show-comments.component.html',
  styleUrls: ['./show-comments.component.css']
})
export class ShowCommentsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
  }, private mdDialogRef: MatDialogRef<ShowCommentsComponent>) {
  }

  ngOnInit(): void {
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
