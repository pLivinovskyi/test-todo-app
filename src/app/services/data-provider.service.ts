import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {serverApi} from '../constant';
import {TodoItem} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(private httpClient: HttpClient) {
  }


  getListData(): Promise<TodoItem[]> {
    return this.httpClient.get<TodoItem[]>(serverApi + 'list').toPromise();
  }
}
