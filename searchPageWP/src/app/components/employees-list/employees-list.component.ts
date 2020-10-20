import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit, QueryList, Renderer2,
  ViewChild
} from '@angular/core';
import {MockService} from '../../services/mock.service';
import {IEmployee} from '../../models/employee';
import {ISearchTerm, SearchService} from '../../services/search.service';
import {MatMenuTrigger} from '@angular/material/menu';
import {SortService} from '../../services/sort.service';
import {IProfile} from '../../models/profile.model';
import {environment} from '../../../environments/environment';
import {strictEqual} from 'assert';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesListComponent implements OnInit {
  @Input() profiles: IProfile[];
  searchTerm: ISearchTerm = {type: '', value: ''};
  byEmployeeTerm: string;
  byDepartmentTerm: string;
  byLocation: string;
  byAZ: string;
  @ViewChild('menu') menu: MatMenuTrigger;
  totalItems: number;
  iconSources: any[] = [];
  currentPage: number = 1;
  workPhoneImgSrc: string = '';
  workPhoneHoverImgSrc: string = '';

  mobilePhoneHoverImgSrc: string = '';
  emailImgSrc: string = '';
  jobImgSrc: string = '';
  locationImgSrc: string = '';
  locationHoverImgSrc: string = '';
  managerIcon: string = '';
  hoverBgColor: string = '#000';
  isShowWorkIcon: boolean = false;
  isShowMobileHoverIcon: boolean = false;
  isShowDepartmentIcon: boolean = false;
  isShowLocationHoverIcon: boolean = false;
  filterResults: any[] = [];
  @ViewChild('workPhonesIconsRef') workPhonesIconsRef: QueryList<ElementRef>;
  profileIndex: number;
  @Input() profileFromAutocompleteSearch: string;
  mobilePhoneImgSrc: string = '';

  constructor(private employeeService: MockService,
              private searchService: SearchService,
              private sortService: SortService,
              private renderer: Renderer2,
              public _sanitizer: DomSanitizer,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.totalItems = this.profiles.length;
    this.workPhoneImgSrc = environment.workPhoneIcon;
    this.mobilePhoneImgSrc = environment.mobilePhoneIcon;
    this.emailImgSrc = environment.emailIcon;
    this.jobImgSrc = environment.jobIcon;
    this.locationImgSrc = environment.locationIcon;
    this.managerIcon = environment.managerIcon;

    this.onSearchByType();
    this.onSort();
    this.cdr.detectChanges();

  }

  /**
   * search service by type (byEmployee,byDepartment,byLocation,byAZ)
   */
  onSearchByType() {
    if (this.profileFromAutocompleteSearch) {
      this.byEmployeeTerm = this.profileFromAutocompleteSearch;
      this.filterResults = this.profiles.filter(profile => profile.FullName === this.profileFromAutocompleteSearch);
      this.totalItems = this.filterResults.length;
    }
    this.searchService.getSearch().subscribe((searchTerm) => {
      switch (searchTerm.type) {
        case 'byEmployee':
          this.byEmployeeTerm = searchTerm.value;
          this.filterResults = this.profiles.filter(profile => profile.FullName === this.byEmployeeTerm);
          this.totalItems = this.filterResults.length;
          this.cdr.detectChanges();
          break;
        case 'byDepartment':
          this.byDepartmentTerm = searchTerm.value;
          this.filterResults = this.profiles.filter(profile => profile.Department === this.byDepartmentTerm);
          this.totalItems = this.filterResults.length;
          this.cdr.detectChanges();
          break;
        case 'byLocation':
          console.log('location', searchTerm.value);
          this.byLocation = searchTerm.value;
          this.filterResults = this.profiles.filter(profile => profile.Office === this.byLocation);
          this.totalItems = this.filterResults.length;
          this.cdr.detectChanges();
          break;
        case 'byAZ':
          console.log('az', searchTerm.value);
          this.byAZ = searchTerm.value;
          this.filterResults = this.profiles.filter(profile => profile.FirstName.startsWith(this.byAZ));
          this.totalItems = this.filterResults.length;
          this.cdr.detectChanges();
          break;
      }
    });

  }

  /**
   * Sort cards by ascending or descending
   */
  onSort() {
    this.sortService.getOrder().subscribe(order => {
      switch (order) {
        case 'asc':
          this.profiles = this.profiles.sort((profile_first: IProfile, profile_next: IProfile) => {
            return profile_first.FirstName.localeCompare(profile_next.FirstName);
          });
          this.totalItems = this.profiles.length;
          this.cdr.detectChanges();
          break;
        case 'desc':
          this.profiles = this.profiles.sort((profile_first: IProfile, profile_next: IProfile) => {
            return profile_next.FirstName.localeCompare(profile_first.FirstName);
          });
          this.totalItems = this.profiles.length;
          this.cdr.detectChanges();
          break;
        default:
          this.profiles = this.profiles.sort();
      }
    });
  }

  pageChanged($event: number) {

  }

  onHoverOnWorkPhone(profile, i) {
    this.profileIndex = this.profiles.indexOf(profile);
    console.log('img index', i);

    this.profiles.forEach((element, index) => {
      if (i === index) {
        console.log('yes');
        element.workPhoneIconUrl = 'aaa';

      }
    });
    this.cdr.detectChanges();
  }

  onLeaveOnWorkPhone(profile, i) {

  }

  /**
   * Change mobile icon on hover
   */
  onHoverOnMobileIcon() {
    this.mobilePhoneImgSrc = environment.mobilePhoneHoverIcon;
  }

  /**
   * Change mobile icon to default
   */
  onLeaveOnMobileIcon() {
    this.mobilePhoneImgSrc = environment.mobilePhoneIcon;
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

  onHoverLocationSubMenu() {
    this.isShowLocationHoverIcon = true;
    this.locationImgSrc = environment.locationHoverIcon;
  }

  onLeaveLocationSubMenu() {
    this.locationImgSrc = environment.locationIcon;
  }

  onOpenMenu(manager: string) {
    let newManager = manager.substring(8);
    console.log('new manager', newManager);
    let managerPerProfile = this.profiles.filter(profile => profile.UserName === newManager);
    console.log('---', managerPerProfile);

  }
}
