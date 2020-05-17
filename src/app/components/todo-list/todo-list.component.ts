import {Component, OnInit} from '@angular/core';
import {TodoItem} from '../../interfaces';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  dataSource: TodoItem[] = [];
  columnsToShow: string [] = ['position', 'name', 'createdAt', 'editedAt', 'action'];

  constructor() {
  }

  ngOnInit(): void {
    this.updateData();
  }

  getRecord(tableRow: TodoItem): void {
  }

  editRecord(event, tableRow: TodoItem): void {
  }

  deleteRecord(event, tableRow: TodoItem): void {

  }

  private updateData() {

  }

}
