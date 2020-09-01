import { Pipe, PipeTransform } from '@angular/core';
import {IEmployee} from '../models/employee';

@Pipe({
  name: 'searchByDepartment'
})
export class SearchByDepartmentPipe implements PipeTransform {

  transform(employees: IEmployee[], searchTerm: any): any {
    if (!employees || !searchTerm) {
      return employees;
    }
    return employees.filter((user) => {
      return  user.department.includes(searchTerm);
    });
  }


}
