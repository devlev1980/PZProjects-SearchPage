import {Injectable} from '@angular/core';
import {SearchByEmployeeService} from './search-by-employee.service';

@Injectable({
  providedIn: 'root'
})
export class SearchByDepartmentService extends SearchByEmployeeService {

  constructor() {
    super();
  }
}
