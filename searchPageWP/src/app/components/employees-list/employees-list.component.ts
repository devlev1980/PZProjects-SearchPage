import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import {MockService} from '../../services/mock.service';
import {ISearchTerm, SearchByEmployeeService} from '../../services/search-by-employee.service';
import {MatMenuTrigger} from '@angular/material/menu';
import {SortService} from '../../services/sort.service';
import {IProfile} from '../../models/profile.model';
import {environment} from '../../../environments/environment';
import {by} from 'protractor';
import {PassCharService} from '../../services/pass-char.service';
import {SearchByDepartmentService} from '../../services/search-by-department.service';
import {SearchByAzService} from '../../services/search-by-az.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {SaveSearchCharService} from '../../services/save-search-char.service';
import {SearchByLocationService} from '../../services/search-by-location.service';
import set = Reflect.set;
import {ClearAllService} from '../../services/clear-all.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesListComponent implements OnInit {
  @Input() profiles: IProfile[];
  searchTerm: ISearchTerm = {type: '', value: '', deleteClick: false};
  byEmployeeTerm: string;
  byDepartmentTerm: string;
  byLocation: string;
  byAZ: string = '';
  @ViewChild('menu',{static: false}) menu: MatMenuTrigger;
  totalItems: number;
  iconSources: any[] = [];
  currentPage: number = 1;
  menuIcon: string = '';
  workPhoneImgSrc: string = '';
  workPhoneHoverImgSrc: string = '';
  mobilePhoneImgSrc: string = '';
  mobilePhoneHoverImgSrc: string = '';
  emailImgSrc: string = '';
  emailHoverImgSrc: string = '';
  jobImgSrc: string = '';
  locationImgSrc: string = '';
  locationHoverImgSrc: string = '';
  managerImgSrc: string = '';
  managerHoverImgSrc: string = '';
  workADayImgSrc: string = '';
  workADayHoverImgSrc: string = '';
  hoverBgColor: string = '#000';
  isShowWorkPhone: boolean = true;
  isShowWorkHoverIcon: boolean = false;
  isShowMobileHoverIcon: boolean = false;
  isShowDepartmentIcon: boolean = false;
  isShowLocationHoverIcon: boolean = false;
  filterResults: any[] = [];
  @ViewChild('workPhonesIconsRef',{static: false}) workPhonesIconsRef: QueryList<ElementRef>;
  profileIndex: number;
  @Input() profileFromAutocompleteSearch: string;

  managerProfile: IProfile;
  profilesCopyFiltered: IProfile[];

  constructor(private employeeService: MockService,
              private searchByEmployeeService: SearchByEmployeeService,
              private searchByDepartmentService: SearchByDepartmentService,
              private searchByAzService: SearchByAzService,
              private searchByLocationService: SearchByLocationService,
              private saveSearchCharService: SaveSearchCharService,
              private clearAllService: ClearAllService,
              private passCharService: PassCharService,
              private sortService: SortService,
              private renderer: Renderer2,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.profiles = this.profiles.filter(profile => profile.Office !== null);
    this.totalItems = this.profiles.length;
    this.menuIcon = environment.menuIcon;
    this.workPhoneImgSrc = environment.workPhoneIcon;
    this.workPhoneHoverImgSrc = environment.workPhoneHoverIcon;
    this.mobilePhoneImgSrc = environment.mobilePhoneIcon;
    this.mobilePhoneHoverImgSrc = environment.mobilePhoneHoverIcon;
    this.emailImgSrc = environment.emailIcon;
    this.emailHoverImgSrc = environment.emailHover;
    this.jobImgSrc = environment.jobIcon;
    this.locationImgSrc = environment.locationIcon;
    this.locationHoverImgSrc = environment.locationHoverIcon;
    this.managerImgSrc = environment.managerIcon;
    this.managerHoverImgSrc = environment.managerHoverIcon;
    this.workADayImgSrc = environment.workaDayIcon;
    this.workADayHoverImgSrc = environment.workaDayHoverIcon;

    // this.cdr.detectChanges();
    this.onSearchByEmployee();
    this.onSearchByDepartment();
    this.onSearchByAZ();
    this.onSearchByLocation();
    this.onSort();
    this.onClearAll();
    this.cdr.detectChanges();

  }

  /**
   * search service by type (byEmployee,byDepartment,byLocation,byAZ)
   */
  onSearchByEmployee() {
    if (this.profileFromAutocompleteSearch) {
      this.byEmployeeTerm = this.profileFromAutocompleteSearch;
      this.filterResults = this.profiles.filter(profile => profile.FullName === this.profileFromAutocompleteSearch);
      this.totalItems = this.filterResults.length;
    }
    this.searchByEmployeeService.getSearch().subscribe((searchTerm) => {
      if (searchTerm.value !== '') {
        this.currentPage = 0;
        this.byEmployeeTerm = searchTerm.value;
        this.filterResults = this.profiles.filter(profile => profile.FullName === searchTerm.value);
        this.totalItems = this.filterResults.length;
        this.cdr.detectChanges();
      }

      if (searchTerm.deleteClick) {
        this.currentPage = 0;
        this.byEmployeeTerm = '';
        this.totalItems = this.profiles.length;
        this.cdr.detectChanges();
      }
    });

    // this.searchByEmployeeService.getSearch().subscribe((searchTerm) => {
    //   switch (searchTerm.type) {
    //     // case 'byEmployee':
    //     //   this.byEmployeeTerm = searchTerm.value;
    //     //   this.filterResults = this.profiles.filter(profile => profile.FullName === searchTerm.value);
    //     //   console.log('by employee result', this.filterResults);
    //     //   this.totalItems = this.filterResults.length;
    //     //   this.cdr.detectChanges();
    //     //   break;
    //     case 'byDepartment':
    //       // this.byDepartmentTerm = searchTerm.value;
    //       // this.filterResults = this.profiles.filter(profile => profile.Department === this.byDepartmentTerm);
    //       // this.totalItems = this.filterResults.length;
    //       // this.cdr.detectChanges();
    //       break;
    //     case 'byLocation':
    //       // this.byLocation = searchTerm.value;
    //       // this.filterResults = this.profiles.filter(profile => profile.Office === this.byLocation);
    //       // this.totalItems = this.filterResults.length;
    //       // this.cdr.detectChanges();
    //       break;
    //     case 'byAZ':
    //       console.log('az');
    //       // this.byAZ = searchTerm.value;
    //       // this.filterResults = this.profiles.filter(profile => profile.FirstName.startsWith(this.byAZ));
    //       // this.totalItems = this.filterResults.length;
    //       // this.cdr.detectChanges();
    //       break;
    //   }
    // });
  }

  onSearchByDepartment() {
    this.searchByDepartmentService.getSearch().subscribe((searchTerm) => {
      if (searchTerm.value !== '') {
        this.currentPage = 0;
        this.byDepartmentTerm = searchTerm.value;
        this.filterResults = this.profiles.filter(profile => profile.Department === searchTerm.value);
        this.totalItems = this.filterResults.length;
        this.cdr.detectChanges();
      }
      if (searchTerm.deleteClick) {
        this.currentPage = 0;
        this.byDepartmentTerm = '';
        this.totalItems = this.profiles.length;
        this.cdr.detectChanges();
      }
    });

  }

  onSearchByAZ() {
    this.searchByAzService.getSearch().subscribe((searchTerm) => {
      if (searchTerm.value) {
        this.byAZ = searchTerm.value;
        this.currentPage = 0;
        this.filterResults = this.profiles.filter(profile => profile.FirstName.startsWith(searchTerm.value));
        this.totalItems = this.filterResults.length;
        this.cdr.detectChanges();
      }
    });
  }

  onSearchByLocation() {
    setTimeout(() => {
      this.searchByLocationService.getSearch().subscribe((searchTerm) => {
        if (searchTerm.value !== '') {
          this.currentPage = 0;
          this.byLocation = searchTerm.value;
          this.filterResults = this.profiles.filter(profile => profile.Office === searchTerm.value);
          this.totalItems = this.filterResults.length;
          this.cdr.detectChanges();
        }
        if (searchTerm.deleteClick) {
          this.currentPage = 0;
          this.byLocation = '';
          this.totalItems = this.profiles.length;
          this.cdr.detectChanges();
        }
      });
    }, 0);

  }

  onClearAll() {
    this.clearAllService.getSearch().subscribe((result) => {
      if (result.deleteClick) {
        this.byAZ = '';
        this.currentPage = 0;
        this.totalItems = this.profiles.length;
        this.cdr.detectChanges();
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

  pageChanged(event: number, char: string) {
    this.currentPage = event;
  }

  onHoverOnWorkPhone(profile, i) {
    this.profileIndex = this.profiles.indexOf(profile);
    this.isShowWorkHoverIcon = true;
    this.profiles.forEach((element, index) => {
      if (i === index) {

        this.cdr.detectChanges();
      }
    });

  }

  onLeaveOnWorkPhone(profile, i) {
    this.isShowWorkHoverIcon = false;
    this.isShowWorkPhone = true;
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

  /**
   * open menu in card profile
   * @param manager = string
   */
  onOpenMenu(manager: string) {
    const newManager = manager.substring(8);
    this.managerProfile = this.profiles.find(profile => profile.UserName === newManager);

  }

  /**
   * Navigate to manager profile page
   * @param profile : IProfile
   */
  onNavigateToTheManagerPage(profile: IProfile) {
    window.location.href = `https://mysytedev01.mobileye.com/_layouts/15/start.aspx#/Person.aspx?AccountName=ME-CORP%5C${profile.UserName}`;
    // https://mysytedev01.mobileye.com/_layouts/15/start.aspx#/Person.aspx?AccountName=ME-CORP%5Cjeremya
  }

  nextPage(page: number, byAZ: string) {
    this.currentPage = page;
    this.saveSearchCharService.saveChar(this.byAZ);

  }

}
