import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'searchByAZ'
})
export class SearchByAZPipe implements PipeTransform {

  transform(employees: IProfile[], searchTerm): any {
    if (!employees || !searchTerm) {
      return employees;
    }
    return employees.filter((user) => {
      return user.FirstName.includes(searchTerm);
    });
  }

}
