import { Injectable } from '@angular/core';
import {SearchByEmployeeService} from './search-by-employee.service';

@Injectable({
  providedIn: 'root'
})
export class SearchByEmployeeEnterService extends SearchByEmployeeService{

  constructor() {
    super();
  }
}
