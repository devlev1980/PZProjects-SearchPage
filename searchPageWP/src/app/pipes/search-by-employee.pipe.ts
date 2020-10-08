import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'searchByEmployee'
})
export class SearchByEmployeePipe implements PipeTransform {

  transform(profiles: IProfile[], searchTerm: string): any {
    if (!profiles || !searchTerm) {
      return profiles;
    }

    return profiles.filter((user) => {
      return user.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase()) || user.LastName.toLowerCase().includes(searchTerm.toLowerCase()) || user.FullName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }




}
