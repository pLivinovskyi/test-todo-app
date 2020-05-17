import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {serverApi} from '../constant';
import {TodoItem} from '../interfaces';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  dataSource$: BehaviorSubject<TodoItem[]> = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient) {
  }

  public updateData() {
    this.getListData().then(res => this.dataSource$.next(res));
  }

  public removeRecord(id: number): void {
    this.deleteItem(id)
      .then(result => {
        const array = this.dataSource$.value;
        const index = array.findIndex(el => el.id === id);
        array.splice(index, 1);
        this.dataSource$.next(array.slice());
      });
  }

  public updateCurrentRow(recordId: number, newValues: any) {
    const editedAt = new Date().toLocaleString();
    this.updateItem(recordId, {...newValues, ...{editedAt}})
      .then((result: TodoItem) => {
        const array = this.dataSource$.value;
        const index = array.findIndex(el => el.id === recordId);
        array.splice(index, 1, result);
        this.dataSource$.next(array.slice());
      });
  }

  public createRecord(values) {
    const createdAt = new Date().toLocaleString();
    this.createItem({createdAt, updatedAt: createdAt, name: values.name, description: values.description})
      .then(result => {
        const array = this.dataSource$.value;
        array.push(result);
        this.dataSource$.next(array.slice());
      });
  }
  private getListData(): Promise<TodoItem[]> {
    return this.httpClient.get<TodoItem[]>(serverApi + 'list').toPromise();
  }

  private deleteItem(id: number): Promise<{}> {
    return this.httpClient.delete(serverApi + 'list/' + id).toPromise();
  }

  private updateItem(id, body): Promise<TodoItem> {
    return this.httpClient.patch<TodoItem>(serverApi + 'list/' + id, body).toPromise();
  }

  private createItem(body): Promise<TodoItem> {
    return this.httpClient.post<TodoItem>(serverApi + 'list', body).toPromise();
  }
}
