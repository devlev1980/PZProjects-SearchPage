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
import {PassCharService} from '../../services/pass-char.service';
import {SearchByDepartmentService} from '../../services/search-by-department.service';
import {SearchByAzService} from '../../services/search-by-az.service';
import {SaveSearchCharService} from '../../services/save-search-char.service';
import {SearchByLocationService} from '../../services/search-by-location.service';
import {ClearAllService} from '../../services/clear-all.service';
import {SearchByEmployeeEnterService} from '../../services/search-by-employee-enter.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesListComponent implements OnInit {
  @Input() profiles: IProfile[];
  @Input() profileFromAutocompleteSearch: string;
  searchTerm: ISearchTerm = {type: '', value: '', deleteClick: false};
  byEmployeeTerm: string;
  byDepartmentTerm: string;
  byLocation: string;
  byAZ: string = '';
  totalItems: number;
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
  filterResults: any[] = [];
  managerProfile: IProfile;
  profilesCopyFiltered: IProfile[];
  @ViewChild('workPhonesIconsRef', {static: false}) workPhonesIconsRef: QueryList<ElementRef>;
  @ViewChild('menu', {static: false}) menu: MatMenuTrigger;

  constructor(private employeeService: MockService,
              private searchByEmployeeService: SearchByEmployeeService,
              private searchByEmployeeEnterService: SearchByEmployeeEnterService,
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

    this.onSearchByEmployee();
    this.onSearchByDepartment();
    this.onSearchByAZ();
    this.onSearchByLocation();
    this.onClearAll();
    this.onSearchByEmployeeOnEnter();
    this.cdr.detectChanges();

  }

  /**
   * search service by type (byEmployee,byDepartment,byLocation,byAZ)
   */
  onSearchByEmployee() {

      this.searchByEmployeeEnterService.getSearch().subscribe(searchTerm => {
        if (searchTerm.type === 'onEnter') {
          return;
        }
      }, error => {
        console.log('Something went wrong', error);
      })

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
      }, error => {
        console.log('Something went wrong', error);
      })


  }

  /**
   * Search employee (show cards) by pressing on 'Enter'
   */
  onSearchByEmployeeOnEnter() {

      this.searchByEmployeeEnterService.getSearch().subscribe(searchTerm => {
        this.byEmployeeTerm = searchTerm.value;
        this.currentPage = 0;
        this.filterResults = this.profiles.filter(profile => profile.FirstName.startsWith(searchTerm.value));
        this.totalItems = this.filterResults.length;
        this.cdr.detectChanges();
      }, error => {
        console.log('Something went wrong', error);
      })


  }

  /**
   * Search employee (show cards) by department
   */
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
      }, error => {
        console.log('Something went wrong', error);
      })


  }

  /**
   * Searching employee(show cards) by A-Z
   */
  onSearchByAZ() {

      this.searchByAzService.getSearch().subscribe((searchTerm) => {
        if (searchTerm.value) {
          this.byAZ = searchTerm.value;
          this.currentPage = 0;
          this.filterResults = this.profiles.filter(profile => profile.FirstName.startsWith(searchTerm.value));
          this.totalItems = this.filterResults.length;
          this.cdr.detectChanges();
        }
      }, error => {
        console.log('Something went wrong', error);
      })


  }

  /**
   * Searching employee(show cards) by A-Z
   */
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
        }, error => {
          console.log('Something went wrong', error);
        })


    }, 0);

  }

  /**
   * Show all the cards by pressing on 'Clear all' button
   */
  onClearAll() {

      this.clearAllService.getSearch().subscribe((result) => {
        if (result.deleteClick) {
          this.byAZ = '';
          this.currentPage = 0;
          this.totalItems = this.profiles.length;
          this.cdr.detectChanges();
        }
      }, error => {
        console.log('Something went wrong', error);
      })


  }

  /**
   * PAge changed
   * @param event: number
   */
  pageChanged(event: number) {
    this.currentPage = event;
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
  }

  /**
   * Click on next page
   * @param page: number
   */
  nextPage(page: number) {
    this.currentPage = page;
    this.saveSearchCharService.saveChar(this.byAZ);
  }



}
