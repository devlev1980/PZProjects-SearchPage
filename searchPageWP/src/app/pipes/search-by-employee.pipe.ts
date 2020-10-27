import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'searchByEmployee'
})
export class SearchByEmployeePipe implements PipeTransform {

  transform(profiles: IProfile[], searchTerm: string): any[] {
    if (!profiles || !searchTerm) {
      return profiles;
    }

    return profiles.filter((profile) => {
      if (profile.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        profile.Rank = 1;
        return profile;

      } else if (profile.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().includes(searchTerm.toLowerCase())) {
        profile.Rank = 3;
        return profile;
      } else if (profile.LastName.toLowerCase().startsWith(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().includes(searchTerm.toLowerCase())) {
        profile.Rank = 2;
        return profile;

      } else if (profile.LastName.toLowerCase().includes(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().includes(searchTerm.toLowerCase())) {
        profile.Rank = 4;
        return profile;

      }
    }).sort((a, b) => {
      if (a.Rank >= b.Rank) {
        return 1;
      } else {
        return -1;
      }

    });

  }

}
