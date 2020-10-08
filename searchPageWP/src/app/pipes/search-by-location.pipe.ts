import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'searchByLocation'
})
export class SearchByLocationPipe implements PipeTransform {

  transform(profiles: IProfile[], searchTerm: any): any {

    if (!profiles || !searchTerm) {
      return profiles;
    }
    return profiles.filter((profile) => {
      console.log('location office', profile.Office);
      if (profile.Office !== null) {
        return profile.Office.includes(searchTerm);
      }
    });
  }

}
