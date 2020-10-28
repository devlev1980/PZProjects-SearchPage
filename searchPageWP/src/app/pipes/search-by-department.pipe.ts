import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'searchByDepartment'
})
export class SearchByDepartmentPipe implements PipeTransform {

  transform(departments: string[], searchTerm: string): any {
    if (!departments || !searchTerm) {
      return departments;
    }
    return departments.filter((department) => {
      return department.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
  }

}
