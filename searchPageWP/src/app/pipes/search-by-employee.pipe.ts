import {Pipe, PipeTransform} from '@angular/core';
import {IEmployee} from '../models/employee';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'searchByEmployee'
})
export class SearchByEmployeePipe implements PipeTransform {

  transform(employees: IProfile[], searchTerm: any): any {
    if (!employees || !searchTerm ) {
      return employees;
    }
    return employees.filter((user) => {
      return user.FirstName.includes(searchTerm) ||
        user.LastName.includes(searchTerm) ;
    });
  }

}
