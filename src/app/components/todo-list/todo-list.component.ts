import {Component, OnInit} from '@angular/core';
import {TodoItem} from '../../interfaces';
import {DataProviderService} from '../../services/data-provider.service';
import {MatDialog} from '@angular/material';
import {DialogTypes} from '../../enums';
import {PreviewItemDialogComponent} from '../dialogs/preview-item-dialog/preview-item-dialog.component';
import {ConfirmationDialogService} from '../../services/confirmation-dialog.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  columnsToShow: string [] = ['position', 'name', 'createdAt', 'editedAt', 'action'];

  constructor(
    public dataProviderService: DataProviderService,
    private dialog: MatDialog,
    private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    this.dataProviderService.updateData();
  }


  editRecord(event, tableRow: TodoItem): void {
    event.stopPropagation();
    const dialog = this.dialog.open(PreviewItemDialogComponent, {
      hasBackdrop: false,
      data: {type: DialogTypes.EDIT, currentRow: tableRow}
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.dataProviderService.updateCurrentRow(tableRow.id, {...tableRow, ...result.values});
      }
    });
  }


  deleteRecord(event, tableRow: TodoItem): void {
    event.stopPropagation();
    this.confirmationDialogService.openConfirmationDialog(DialogTypes.DELETE)
      .subscribe(isConfirmed => {
        if (isConfirmed) {
          this.dataProviderService.removeRecord(tableRow.id);
        }
      });
  }




}
