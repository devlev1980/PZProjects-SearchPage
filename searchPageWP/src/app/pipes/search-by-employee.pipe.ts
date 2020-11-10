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
      if (profile.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase()) && profile.LastName.toLowerCase().startsWith(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        profile.FirstNameRankOnStart = profile.FirstName.toLowerCase().indexOf(searchTerm.toLowerCase());
        return profile;

      } else if (profile.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().includes(searchTerm.toLowerCase())) {
        profile.FirstNameRankNotStart = profile.FirstName.toLowerCase().indexOf(searchTerm.toLowerCase());

      } else if (profile.LastName.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        profile.LastNameRankOnStart = profile.LastName.toLowerCase().indexOf(searchTerm.toLowerCase()) + 20;
      } else if (profile.LastName.toLowerCase().includes(searchTerm.toLowerCase())) {
        profile.LastNameRankNotOnStart = profile.LastName.toLowerCase().indexOf(searchTerm.toLowerCase()) + 20;
      }
    })
      .sort((a, b) => {
        if (a.FirstNameRankOnStart > b.FirstNameRankOnStart) {
          return 1;
        } else {
          return -1;
        }

      }).reverse().sort((b, c) => {
        if (b.LastName > c.LastName) {
          return 1;
        } else {
          return -1;
        }
      });

  }

}
