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

  constructor(private employeeService: MockService,
              private cdr: ChangeDetectorRef,
              private sharepointService: SharepointService) {
  }

  ngOnInit() {
    // this.employeeService.getEmployeeList().subscribe((data) => this.employeeList = data);
    this.sharepointService.getProfiles().subscribe(profiles => {
      console.log('Profiles in component', profiles);
      this.profiles = profiles;
      this.departments  = [];
      this.profiles.forEach(item => {
        this.departments.push(item.Department);
      });
     this.departments = Array.from(new Set(this.departments));
      console.log('Departments', this.departments);
    });
  }

  getFields(profiles) {

    // for (const profile of profiles) {
    //   const profileObject: IProfile = {
    //     EmployeeID: '',
    //     FirstName: '',
    //     LastName: '',
    //     PictureUrl: '',
    //     Cell: '',
    //     WorkEmail: '',
    //     FullName: '',
    //     ManagerDisplayName: '',
    //     Department: '',
    //     Building: '',
    //     OfficeNumber: ''
    //   };
    //   for (const j of profile) {
    //     if (
    //       (j.Key === 'FirstName' && j.Value !== '') ||
    //       (j.Key === 'WorkEmail' && j.Value !== null) ||
    //       (j.Key === 'Cell' && j.Value !== '' && j.Value !== null) ||
    //       (j.Key === 'PictureUrl' && j.Value !== null) ||
    //       (j.Key === 'FullName' && j.Value !== '') ||
    //       (j.Key === 'LastName' && j.Value !== null)) {
    //       profileObject.FullName = '';
    //       profileObject[j.Key] = j.Value;
    //       this.profiles.push(profileObject);
    //     }
    //   }
    // }
    // console.log('--- profiles', this.profiles);
  }

}
