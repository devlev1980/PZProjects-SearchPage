import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MockService} from '../../services/mock.service';
import {IEmployee} from '../../models/employee';
import {ISearchTerm, SearchService} from '../../services/search.service';
import {MatMenuTrigger} from '@angular/material/menu';
import {SortService} from '../../services/sort.service';
import {IProfile} from '../../models/profile.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesListComponent implements OnInit {
  // @Input() employeeList: IEmployee[];
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
  filterResults: any[] = [];
  totals;

  constructor(private employeeService: MockService,
              private searchService: SearchService,
              private sortService: SortService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.totalItems = this.profiles.length;
    this.workPhoneImgSrc = environment.workPhoneImgSrc;
    this.mobilePhoneImgSrc = environment.mobilePhoneImgSrc;

    this.onSearchByType();
    this.onSort();


  }

  /**
   * search service by type (byEmployee,byDepartment,byLocation,byAZ)
   */
  onSearchByType() {
    this.searchService.getSearch().subscribe((searchTerm) => {
      switch (searchTerm.type) {
        case 'byEmployee':
          this.filterResults = this.profiles.filter(profile => profile.FullName === searchTerm.value);
          this.totalItems = this.filterResults.length;
          this.byEmployeeTerm = searchTerm.value;

          this.cdr.detectChanges();
          break;
        case 'byDepartment':
          this.byDepartmentTerm = searchTerm.value;
          this.filterResults = this.profiles.filter(profile => profile.Department === searchTerm.value);
          this.totalItems = this.filterResults.length;

          this.cdr.detectChanges();
          break;
        case 'byLocation':
          console.log('location', searchTerm.value);
          this.byLocation = searchTerm.value;
          this.filterResults = this.profiles.filter(profile => profile.Office === searchTerm.value);
          this.totalItems = this.filterResults.length;

          this.cdr.detectChanges();
          break;
        case 'byAZ':
          this.byAZ = searchTerm.value;
          this.profiles.filter(profile => profile.FullName.startsWith(searchTerm.value));

          this.cdr.detectChanges();
          break;
      }
    });

  }

  /**
   * Sort service by ascending or descending
   */
  onSort() {
    this.sortService.getOrder().subscribe(order => {
      console.log('order', order);

      switch (order) {
        case 'asc':
          this.profiles = this.profiles.sort((item1: IProfile, item2: IProfile) => {
            return item1.FirstName.localeCompare(item2.FirstName)
          });
          this.totalItems = this.profiles.length;
          console.log('asc', this.profiles);
          this.cdr.detectChanges();


          break;
        case 'desc':
          this.profiles = this.profiles.sort((item1: IProfile, item2: IProfile) => {
            return item2.FirstName.localeCompare(item1.FirstName);
          });
          this.totalItems = this.profiles.length;
          console.log('desc', this.profiles);
          this.cdr.detectChanges();

          break;
        default:
          this.profiles = this.profiles.sort();

      }

    });

  }

  pageChanged($event: number) {

  }

  /**
   * Change mobile icon on hover
   */
  onHoverOnMobileIcon() {
    this.isShowMobileIcon = true;
  }

  /**
   * Change mobile icon to default
   */
  onLeaveOnMobileIcon() {
    this.isShowMobileIcon = false;
  }

  /**
   * Change department icon on hover
   */
  onHoverOnDepartmentIcon() {
    this.isShowDepartmentIcon = true;
  }

  /**
   * Change department icon to default
   */
  onLeaveOnDepartmentIcon() {
    this.isShowDepartmentIcon = false;
  }
}
