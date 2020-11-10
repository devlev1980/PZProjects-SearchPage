import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'cardsByLocation'
})
export class CardsByLocationPipe implements PipeTransform {

  transform(profiles: IProfile[], searchTerm: string): any[] {
    let newProfiles = profiles.filter(profile=> profile.Office !== null)
    if (!profiles || !searchTerm) {
      return profiles;
    }

    return newProfiles.filter((profile) => {
      return profile.Office.toLowerCase().startsWith(searchTerm.toLowerCase());
    });

  }

}
