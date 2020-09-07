import { Pipe, PipeTransform } from '@angular/core';
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
      return  profile.Office.includes(searchTerm);
    });
  }

}
