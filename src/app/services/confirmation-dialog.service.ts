import {Injectable} from '@angular/core';
import {ConfirmationDialogComponent} from '../components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(private dialog: MatDialog) {
  }


  openConfirmationDialog(type) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      hasBackdrop: false,
      data: {type}
    });

    return dialog.afterClosed();
  }
}
