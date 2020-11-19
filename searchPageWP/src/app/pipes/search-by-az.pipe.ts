import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'searchByAZ'
})
export class SearchByAZPipe implements PipeTransform {
  /**
   * Filter by A-Z
   * @param employees:  IProfile[]
   * @param searchTerm: string
   */
  transform(employees: IProfile[], searchTerm): any {
    if (!employees || !searchTerm) {
      return employees;
    }
    return employees.filter((user) => {
      return user.FirstName.startsWith(searchTerm);
    });
  }

}
