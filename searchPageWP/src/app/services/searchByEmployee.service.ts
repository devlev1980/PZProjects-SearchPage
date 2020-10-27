import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchByEmployeeService {
  private search: Subject<ISearchTerm>;

  constructor() {
    this.search = new Subject<ISearchTerm>();
  }


  setSearch(searchTerm: ISearchTerm) {
    this.search.next(searchTerm);
  }

  getSearch() {
    return this.search.asObservable();
  }
}

export interface ISearchTerm {
  type: string;
  value: string;
}

