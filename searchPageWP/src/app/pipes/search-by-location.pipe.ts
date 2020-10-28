import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';
import {ILocation} from '../search-page-spfx-web-part/search-page-spfx-web-part.component';

@Pipe({
  name: 'searchByLocation'
})
export class SearchByLocationPipe implements PipeTransform {

  transform(locations: ILocation[], searchTerm: string): any {

    if (!locations || !searchTerm) {
      return locations;
    }
    return locations.filter((location) => {
        return location.Office.toLowerCase().startsWith(searchTerm.toLowerCase());

    });
  }
}
