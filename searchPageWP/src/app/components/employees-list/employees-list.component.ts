import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MockService} from '../../services/mock.service';
import {IEmployee} from '../../models/employee';
import {ISearchTerm, SearchService} from '../../services/search.service';
import {MatMenuTrigger} from '@angular/material/menu';
import {SortService} from '../../services/sort.service';
import {IProfile} from '../../models/profile.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesListComponent implements OnInit {
  @Input() employeeList: IEmployee[];
  @Input() profiles: IProfile[] = [];
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
  hoverBgColor: string = '#000';
  isShowMobileIcon: boolean = false;
  isShowDepartmentIcon: boolean = false;

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
          this.cdr.detectChanges();
          break;
        case 'byDepartment':
          this.byDepartmentTerm = searchTerm.value;
          this.cdr.detectChanges();
          break;
        case 'byLocation':
          this.byLocation = searchTerm.value;
          this.cdr.detectChanges();
          break;
        case 'byAZ':
          this.byAZ = searchTerm.value;
          this.cdr.detectChanges();
          break;
      }
    });

    this.sortService.getOrder().subscribe(order => {
      switch (order) {
        case 'asc':
          this.profiles = this.profiles.sort();
          break;
        case 'desc':
          this.profiles = this.profiles.sort().reverse();
          break;
        default:
          this.profiles = this.profiles.sort();

      }
      // if (order === 'asc') {
      //   this.profiles = this.profiles.sort();
      //
      // } else if (order === 'desc') {
      //   this.profiles = this.profiles.sort().reverse();
      // }
    });

  }

  pageChanged($event: number) {

  }

  onHoverOnMobileIcon() {
  this.isShowMobileIcon = true;
  }

  onLeaveOnMobileIcon() {
    this.isShowMobileIcon = false;
  }

  onHoverOnDepartmentIcon() {
    this.isShowDepartmentIcon = true;
  }

  onLeaveOnDepartmentIcon() {
    this.isShowDepartmentIcon = false;
  }
}
