import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'cardsByDepartment'
})
export class CardsByDepartmentPipe implements PipeTransform {

  transform(profiles: IProfile[], searchTerm: string): any[] {
    if (!profiles || !searchTerm) {
      return profiles;
    }

    return profiles.filter((profile) => {
      return profile.Department.toLowerCase().startsWith(searchTerm.toLowerCase());
    });

  }

}
