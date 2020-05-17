import {Component, OnInit} from '@angular/core';
import {TodoItem} from '../../interfaces';
import {DataProviderService} from '../../services/data-provider.service';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import {DialogTypes} from '../../enums';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  dataSource: TodoItem[] = [];
  columnsToShow: string [] = ['position', 'name', 'createdAt', 'editedAt', 'action'];

  constructor(private dataProviderService: DataProviderService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updateData();
  }

  getRecord(tableRow: TodoItem): void {
  }

  editRecord(event, tableRow: TodoItem): void {
  }

  deleteRecord(event, tableRow: TodoItem): void {
    event.stopPropagation();

    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      hasBackdrop: false,
      data: {type: DialogTypes.DELETE}
    });

    dialog.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        this.dataProviderService.deleteItem(tableRow.id)
          .then(result => {
            const index = this.dataSource.findIndex(el => el.id === tableRow.id);
            this.dataSource.splice(index, 1);
            this.dataSource = this.dataSource.slice();
          });
      }
    });
  }

  private updateData() {
    this.dataProviderService.getListData()
      .then(result => this.dataSource = result);
  }

}
