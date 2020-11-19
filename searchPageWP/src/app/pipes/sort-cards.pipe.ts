import { Pipe, PipeTransform } from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'sortCards'
})
export class SortCardsPipe implements PipeTransform {
  /**
   * Sorting cards by 'ascending'
   * @param profiles: IProfile[]
   * @param property: string
   */
  transform(profiles: IProfile[], property: string): any[] {
    if (!profiles || !property) {
      return;
    }
    return profiles.sort((a, b) => {
      if (a.FirstName.toLowerCase() > b.FirstName.toLowerCase()) {
        return 1;
      } else if (a.FirstName.toLowerCase() < b.FirstName.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });

  }


}
