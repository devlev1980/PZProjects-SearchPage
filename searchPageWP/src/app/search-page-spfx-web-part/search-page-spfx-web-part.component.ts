import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MockService} from '../services/mock.service';
import {IEmployee} from '../models/employee';
import {SharepointService} from '../services/sharepoint.service';
import {IProfile} from '../models/profile.model';

@Component({
  selector: 'app-search-page-spfx-web-part',
  templateUrl: './search-page-spfx-web-part.component.html',
  styleUrls: ['./search-page-spfx-web-part.component.scss'],
})
export class SearchPageSpfxWebPartComponent implements OnInit {
  @Input() description: string;
  profiles: IProfile[] = [];
  employeeList: IEmployee[] = [];
  AZ_characters: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  departments: string[] = [];
  locations: string[] = [];

  constructor(private employeeService: MockService,
              private cdr: ChangeDetectorRef,
              private sharepointService: SharepointService) {
  }

  ngOnInit() {
    // this.employeeService.getEmployeeList().subscribe((data) => this.employeeList = data);
    this.sharepointService.getProfiles().subscribe(profiles => {
      console.log('Profiles in component', profiles);
      this.profiles = profiles;
      this.departments = [];
      this.profiles.forEach(item => {
        this.departments.push(item.Department);
        if (item.Office !== null) {
          this.locations.push(item.Office);
        }
      });
      this.departments = Array.from(new Set(this.departments));
      this.locations = Array.from(new Set(this.locations));
    });
  }

}
