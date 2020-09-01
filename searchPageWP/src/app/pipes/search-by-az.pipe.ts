import { Pipe, PipeTransform } from '@angular/core';
import {IEmployee} from '../models/employee';

@Pipe({
  name: 'searchByAZ'
})
export class SearchByAZPipe implements PipeTransform {

  transform(employees: IEmployee[], searchTerm): any {
    if (!employees || !searchTerm) {
      return employees;
    }
    return employees.filter((user) => {
      return user.first_name.includes(searchTerm)
    });
  }

}
