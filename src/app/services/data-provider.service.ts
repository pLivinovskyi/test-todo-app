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

  updateData() {
    this.getListData().then(res => this.dataSource$.next(res));
  }


  updateRecord(id, body): Promise<TodoItem> {
    return this.httpClient.put<TodoItem>(serverApi + 'list/' + id, body).toPromise();
  }

  private getListData(): Promise<TodoItem[]> {
    return this.httpClient.get<TodoItem[]>(serverApi + 'list').toPromise();
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

  private deleteItem(id: number): Promise<{}> {
    return this.httpClient.delete(serverApi + 'list/' + id).toPromise();
  }
}
