import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'cardsByLocation'
})
export class CardsByLocationPipe implements PipeTransform {
  /**
   * Filter cards by location
   * @param profiles: IProfile[]
   * @param searchTerm: string
   */
  transform(profiles: IProfile[], searchTerm: string): any[] {
    const newProfiles = profiles.filter(profile => profile.Office !== null);
    if (!profiles || !searchTerm) {
      return profiles;
    }

    return newProfiles.filter((profile) => {
      return profile.Office.toLowerCase().startsWith(searchTerm.toLowerCase());
    });

  }

}
