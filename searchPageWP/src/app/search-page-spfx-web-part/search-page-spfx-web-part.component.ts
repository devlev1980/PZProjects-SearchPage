import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MockService} from '../services/mock.service';
import {IEmployee} from '../models/employee';
import {SharepointService} from '../services/sharepoint.service';
import {IProfile} from '../models/profile.model';

@Component({
  selector: 'app-search-page-spfx-web-part',
  templateUrl: './search-page-spfx-web-part.component.html',
  styleUrls: ['./search-page-spfx-web-part.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageSpfxWebPartComponent implements OnInit {
  @Input() description: string;
  profiles: IProfile[] = [];
  employeeList: IEmployee[] = [];
  AZ_characters: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  departments: string[] = [];
  locations: string[] = [];
  profileFromSearch: string = '';
  locationByOffice: ILocation[] = [];
  orderedLocations: any = [];

  constructor(private employeeService: MockService,
              private cdr: ChangeDetectorRef,
              private sharepointService: SharepointService) {
  }

  ngOnInit() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.profileFromSearch = urlParams.get('profile');

    this.sharepointService.getPofilesCached().subscribe(profiles => {
      this.profiles = profiles;
      console.log('---', this.profiles);
      this.departments = [];
      this.locations = [];
      this.departments = this.profiles.map(el => el.Department);
      this.profiles.forEach(item => {
        item.FirstNameRankOnStart = null;
        item.FirstNameRankNotStart = null;
        item.LastNameRankOnStart = null;
        item.LastNameRankNotOnStart = null;
        if (this.locationByOffice.findIndex(el => el.Office === item.Office) === -1) {
          this.locationByOffice.push({
            Office: item.Office,
            count: 1
          });
        } else {
          const index = this.locationByOffice.findIndex(el => el.Office === item.Office);
          this.locationByOffice[index].count++;
        }
      });
      this.locationByOffice = this.locationByOffice.filter(location => location.Office !== null).sort((a, b) => {
        if (a.count < b.count) {
          return 1;
        } else {
          return -1;
        }
      });

      this.departments = Array.from(new Set(this.departments)).sort();
      this.locations = Array.from(new Set(this.locations)).sort();
      this.cdr.detectChanges();
    }, error => {
      console.log('Something went wrong', error);
    });
  }

}

export interface ILocation {
  Office: string;
  count: number;
}
