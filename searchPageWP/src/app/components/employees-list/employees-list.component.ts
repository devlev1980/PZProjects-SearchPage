import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MockService} from '../../services/mock.service';
import {IEmployee} from '../../models/employee';
import {ISearchTerm, SearchService} from '../../services/search.service';
import {MatMenuTrigger, MenuPositionX, MenuPositionY} from '@angular/material/menu';
import {SortService} from '../../services/sort.service';
import {IProfile} from '../../models/profile.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  // @Input() employeeList: IEmployee[];
  @Input() profiles: IProfile[];
  searchTerm: ISearchTerm = {type: '', value: ''};
  byEmployeeTerm: string;
  byDepartmentTerm: string;
  byLocation: string;
  byAZ: string;
  @ViewChild('menu') menu: MatMenuTrigger;
   totalItems: number;
   currentPage: number = 1;
   workPhoneImgSrc: string = '';
   mobilePhoneImgSrc: string = '';

  constructor(private employeeService: MockService,
              private searchService: SearchService,
              private sortService: SortService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  this.totalItems = this.profiles.length;
  this.workPhoneImgSrc = 'https://sytedev01.mobileye.com/sites/apps/SiteAssets/icons/phone.png?csf=1&e=F1o6Vj';
  this.mobilePhoneImgSrc = 'https://sytedev01.mobileye.com/sites/apps/SiteAssets/icons/mobile.png?csf=1&e=alqtkk';
    this.searchService.getSearch().subscribe((searchTerm) => {
      switch (searchTerm.type) {
        case 'byEmployee':
          this.byEmployeeTerm = searchTerm.value;
          break;
        case 'byDepartment':
          this.byDepartmentTerm = searchTerm.value;
          break;
        case 'byLocation':
          this.byLocation = searchTerm.value;
          break;
        case 'byAZ':
          this.byAZ = searchTerm.value;
          break;
      }
    });

    this.sortService.getOrder().subscribe(order => {
      if (order === 'asc') {
        this.profiles = this.profiles.sort();

      } else if (order === 'desc') {
        this.profiles = this.profiles.sort().reverse();
      }
    });

  }

  pageChanged($event: number) {

  }

  onHover() {
    this.mobilePhoneImgSrc = 'https://sytedev01.mobileye.com/sites/apps/SiteAssets/icons/mobile_hover.png?csf=1&e=pETNfJ'
    // this.workPhoneImgSrc = '';
  }

  onLeave() {
    // this.workPhoneImgSrc = '';
    this.mobilePhoneImgSrc = 'https://sytedev01.mobileye.com/sites/apps/SiteAssets/icons/mobile.png?csf=1&e=alqtkk';

  }
}
