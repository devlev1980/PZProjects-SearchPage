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

    // Old search
    // return profiles.filter((profile) => {
    //   if (profile.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().startsWith(searchTerm.toLowerCase())) {
    //     profile.Rank = 1;
    //     return profile;
    //
    //   } else if (profile.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().includes(searchTerm.toLowerCase())) {
    //     profile.Rank = 3;
    //     return profile;
    //   } else if (profile.LastName.toLowerCase().startsWith(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().includes(searchTerm.toLowerCase())) {
    //     profile.Rank = 2;
    //     return profile;
    //
    //   } else if (profile.LastName.toLowerCase().includes(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().includes(searchTerm.toLowerCase())) {
    //     profile.Rank = 4;
    //     return profile;
    //
    //   }
    // }).sort((a, b) => {
    //   if (a.Rank >= b.Rank) {
    //     return 1;
    //   } else {
    //     return -1;
    //   }
    //
    // });

    return profiles.filter((profile) => {
      if (profile.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase()) && profile.LastName.toLowerCase().startsWith(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        profile.FirstNameRankOnStart = profile.FirstName.toLowerCase().indexOf(searchTerm.toLowerCase());
        // this.firstNamesOnStart.push(profile);
        return profile;

      } else if (profile.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().includes(searchTerm.toLowerCase())) {
        profile.FirstNameRankNotStart = profile.FirstName.toLowerCase().indexOf(searchTerm.toLowerCase());
        // this.firstNamesNotOnStart.push(profile);

      } else if (profile.LastName.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        profile.LastNameRankOnStart = profile.LastName.toLowerCase().indexOf(searchTerm.toLowerCase()) + 20;
        // this.lastNamesOnStart.push(profile);
      } else if (profile.LastName.toLowerCase().includes(searchTerm.toLowerCase())) {
        profile.LastNameRankNotOnStart = profile.LastName.toLowerCase().indexOf(searchTerm.toLowerCase()) + 20;
        // this.lastNamesNotOnStart.push(profile);

      }

      // return (profile.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase())
      // if (profile.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase())) {
      //   profile.FirstNameRankOnStart = profile.FirstName.toLowerCase().indexOf(searchTerm.toLowerCase());
      //   this.firstNamesOnStart.push(profile);
      //   console.log('firstNames on start', this.firstNamesOnStart)
      //   return profile
      //
      //   } else if (profile.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().includes(searchTerm.toLowerCase())) {
      //     profile.FirstNameRankNotStart = profile.FirstName.toLowerCase().indexOf(searchTerm.toLowerCase());
      //     // this.firstNamesNotOnStart.push(profile);
      //     // console.log('firstNames not on start', this.firstNamesNotOnStart);
      //     return profile
      //
      //   } else if (profile.LastName.toLowerCase().startsWith(searchTerm.toLowerCase())) {
      //     profile.LastNameRankOnStart = profile.LastName.toLowerCase().indexOf(searchTerm.toLowerCase()) + 20;
      //     // this.lastNamesOnStart.push(profile);
      //     // console.log('lastNames on start', this.lastNamesOnStart);
      //     return profile
      //   } else if (profile.LastName.toLowerCase().includes(searchTerm.toLowerCase())) {
      //     profile.LastNameRankNotOnStart = profile.LastName.toLowerCase().indexOf(searchTerm.toLowerCase()) + 20;
      //     // this.lastNamesNotOnStart.push(profile);
      //     // console.log('lastNames not start', this.lastNamesNotOnStart);
      //     return profile
      // }

    })
      // console.log('firstNames on start', this.firstNamesOnStart)
      // console.log('firstNames not on start', this.firstNamesNotOnStart);

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
