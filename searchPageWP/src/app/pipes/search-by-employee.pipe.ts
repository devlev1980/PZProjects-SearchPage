import {Pipe, PipeTransform} from '@angular/core';
import {IEmployee} from '../models/employee';

@Pipe({
  name: 'searchByEmployee'
})
export class SearchByEmployeePipe implements PipeTransform {

  transform(employees: IEmployee[], searchTerm: any): any {
    if (!employees || !searchTerm ) {
      return employees;
    }
    return employees.filter((user) => {
      return user.first_name.includes(searchTerm) ||
        user.last_name.includes(searchTerm) ;
    });
  }

}
