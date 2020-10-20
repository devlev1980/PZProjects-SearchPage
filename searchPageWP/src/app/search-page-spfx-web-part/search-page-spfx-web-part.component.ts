import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MockService} from '../services/mock.service';
import {IEmployee} from '../models/employee';
import {SharepointService} from '../services/sharepoint.service';
import {IProfile} from '../models/profile.model';
import {environment} from '../../environments/environment';

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
      console.log('profiles', this.profiles);
      this.departments = [];

      this.profiles.forEach(item => {
        item.Rank = null;
        this.departments.push(item.Department);
        if (item.Office !== null) {
          this.locations.push(item.Office);
        }
      });
      this.departments = Array.from(new Set(this.departments)).sort();
      this.locations = Array.from(new Set(this.locations)).sort();
      this.cdr.detectChanges();
    });
  }

}
