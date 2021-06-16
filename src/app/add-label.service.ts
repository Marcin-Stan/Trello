import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {CreateLabelComponent} from "./create-label/create-label.component";

@Injectable()
export class AddLabelService {

  constructor(private dialog: MatDialog) {
  }

  dialogRef: MatDialogRef<CreateLabelComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(CreateLabelComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
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
