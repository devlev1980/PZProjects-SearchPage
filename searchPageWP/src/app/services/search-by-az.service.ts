import { Injectable } from '@angular/core';
import {SearchByEmployeeService} from './search-by-employee.service';

@Injectable({
  providedIn: 'root'
})
export class SearchByAzService extends SearchByEmployeeService{

  constructor() {
    super();
  }
}
