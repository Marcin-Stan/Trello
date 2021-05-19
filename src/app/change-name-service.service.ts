import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {NameChangeComponent} from './name-change/name-change.component';

@Injectable()
export class ChangeNameService {
  constructor(private dialog: MatDialog) {
  }

  dialogRef: MatDialogRef<NameChangeComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(NameChangeComponent, {
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


