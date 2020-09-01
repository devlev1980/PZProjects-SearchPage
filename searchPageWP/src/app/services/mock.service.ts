import {Injectable} from '@angular/core';
import {IEmployee} from '../models/employee';
import {employeeList} from '../../assets/mock/employee-list';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MockService {
  employees: Array<IEmployee>;

  constructor() {
    this.employees = employeeList;
  }

  getEmployeeList(): Observable<IEmployee[]> {
    return of(this.employees);
  }
}
