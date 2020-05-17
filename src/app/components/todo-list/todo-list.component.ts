import {Component, OnInit} from '@angular/core';
import {TodoItem} from '../../interfaces';
import {DataProviderService} from '../../services/data-provider.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  dataSource: TodoItem[] = [];
  columnsToShow: string [] = ['position', 'name', 'createdAt', 'editedAt', 'action'];

  constructor(private dataProviderService: DataProviderService) {
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
    this.dataProviderService.deleteItem(tableRow.id)
      .then(result => {
        const index = this.dataSource.findIndex(el => el.id === tableRow.id);
        this.dataSource.splice(index, 1);
        this.dataSource.slice();
      });
  }

  private updateData() {
    this.dataProviderService.getListData()
      .then(result => this.dataSource = result);
  }

}
