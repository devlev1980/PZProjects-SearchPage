import {Pipe, PipeTransform} from '@angular/core';
import {IEmployee} from '../models/employee';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'searchByEmployee'
})
export class SearchByEmployeePipe implements PipeTransform {

  transform(profiles: IProfile[], searchTerm: any): any {
    if (!profiles || !searchTerm ) {
      return profiles;
    }
    return profiles.filter((profile) => {
      return profile.FirstName.includes(searchTerm) ||
        profile.FullName.includes(searchTerm) ||
        profile.LastName.includes(searchTerm) ;
    });
  }

}
