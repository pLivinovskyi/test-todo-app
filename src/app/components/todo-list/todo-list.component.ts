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
  dataSource: TodoItem[] = [];
  columnsToShow: string [] = ['position', 'name', 'createdAt', 'editedAt', 'action'];

  constructor(
    private dataProviderService: DataProviderService,
    private dialog: MatDialog,
    private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    this.updateData();
  }

  getRecord(tableRow: TodoItem): void {
  }

  editRecord(event, tableRow: TodoItem): void {
    event.stopPropagation();

    const dialog = this.dialog.open(PreviewItemDialogComponent, {
      hasBackdrop: false,
      data: {type: DialogTypes.EDIT, currentRow: tableRow}
    });
    dialog.afterClosed().subscribe(result => {
      if (result.type === DialogTypes.DELETE) {
        this.removeRecord(tableRow.id);
      } else if (result.type === DialogTypes.EDIT) {
        this.updateRecord(tableRow.id, {...tableRow, ...result.values});
      }
    });
  }


  deleteRecord(event, tableRow: TodoItem): void {
    event.stopPropagation();
    this.confirmationDialogService.openConfirmationDialog(DialogTypes.DELETE)
      .subscribe(isConfirmed => {
        if (isConfirmed) {
          this.removeRecord(tableRow.id);
        }
      });
  }

  private updateData() {
    this.dataProviderService.getListData()
      .then(result => this.dataSource = result);
  }

  private removeRecord(id: number): void {
    this.dataProviderService.deleteItem(id)
      .then(result => {
        const index = this.dataSource.findIndex(el => el.id === id);
        this.dataSource.splice(index, 1);
        this.dataSource = this.dataSource.slice();
      });
  }

  private updateRecord(recordId: number, newValues: any) {
    this.dataProviderService.updateRecord(recordId, newValues)
      .then((result: TodoItem) => {
        const index = this.dataSource.findIndex(el => el.id === recordId);
        this.dataSource.splice(index, 1, result);
        this.dataSource = this.dataSource.slice();
      });
  }

}
