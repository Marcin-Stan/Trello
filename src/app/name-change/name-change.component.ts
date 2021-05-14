import {Component, Inject, OnInit, Output} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-name-change',
  templateUrl: './name-change.component.html',
  styleUrls: ['./name-change.component.css']
})
export class NameChangeComponent implements OnInit {
  newName: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string
  }, private mdDialogRef: MatDialogRef<NameChangeComponent>){}

  ngOnInit(): void {
  }

  public cancel() {
    this.mdDialogRef.close();
  }
  public close() {
    this.mdDialogRef.close();
  }
  public confirm() {
    this.mdDialogRef.close(this.newName);
  }
}
