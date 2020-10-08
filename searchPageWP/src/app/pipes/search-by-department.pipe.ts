import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'searchByDepartment'
})
export class SearchByDepartmentPipe implements PipeTransform {

  transform(profiles: IProfile[], searchTerm: any): any {
    if (!profiles || !searchTerm) {
      console.log('good');
      return profiles;
    }
    return profiles.filter((profile) => {
      return  profile.Department.includes(searchTerm);
    });
  }


}
