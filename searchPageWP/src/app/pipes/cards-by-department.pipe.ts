import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'cardsByDepartment'
})
export class CardsByDepartmentPipe implements PipeTransform {
  /**
   * Filter cards by department
   * @param profiles:  IProfile[]
   * @param searchTerm: searchTerm
   */
  transform(profiles: IProfile[], searchTerm: string): any[] {
    if (!profiles || !searchTerm) {
      return profiles;
    }

    return profiles.filter((profile) => {
      return profile.Department.toLowerCase().startsWith(searchTerm.toLowerCase());
    });

  }

}
