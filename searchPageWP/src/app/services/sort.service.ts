import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  private order: Subject<string>;

  constructor() {
    this.order = new Subject<string>();
  }

  setOrder(order: string) {
    this.order.next(order);
  }

  getOrder() {
    return this.order.asObservable();
  }
}


