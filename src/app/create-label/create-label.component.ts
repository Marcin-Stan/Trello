import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-label',
  templateUrl: './create-label.component.html',
  styleUrls: ['./create-label.component.css']
})
export class CreateLabelComponent implements OnInit {
  newName: any;
  newColor: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string
  }, private mdDialogRef: MatDialogRef<CreateLabelComponent>) {
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
    this.mdDialogRef.close([this.newName, this.newColor]);
  }
}
