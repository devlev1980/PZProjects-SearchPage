import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchByEmployeeService} from '../../services/search-by-employee.service';
import {SortService} from '../../services/sort.service';
import {fromEvent, Subscription} from 'rxjs';
import {IProfile} from '../../models/profile.model';
import {environment} from '../../../environments/environment';
import {ILocation} from '../../search-page-spfx-web-part/search-page-spfx-web-part.component';
import {PassCharService} from '../../services/pass-char.service';
import {SearchByDepartmentService} from '../../services/search-by-department.service';
import {SearchByLocationService} from '../../services/search-by-location.service';
import {SearchByAzService} from '../../services/search-by-az.service';
import {ClearAllService} from '../../services/clear-all.service';
import {SaveSearchCharService} from '../../services/save-search-char.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-search-by',
  templateUrl: './search-by.component.html',
  styleUrls: ['./search-by.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchByComponent implements OnInit, AfterViewInit {
  @Input() departments: string[] = [];
  @Input() locations: ILocation[];
  @Input() profiles: IProfile[];
  searchForm: FormGroup;
  @ViewChild('sortBtn') sortBtn: ElementRef;
  click$: Subscription;
  count: number = 1;
  imgSrc: string = '';
  DescIcon: boolean;
  showAutocompleteByDepartment: boolean = false;
  showAutocompleteByLocation: boolean = false;
  showAutocompleteByEmployee: boolean = false;
  @ViewChild('autocompleteDepartmentsRef') autocompleteDepartmentsRef: ElementRef;
  @ViewChild('autocompleteLocationsRef') autocompleteLocationsRef: ElementRef;
  @ViewChild('autocompleteEmployeeRef') autocompleteEmployeeRef: ElementRef;
  @ViewChild('virtualScrollRef') virtualScrollRef: ElementRef;
  isShow: boolean = true;
  selectedUser: string = '';
  autocompleteByEmployee_ulHeight: number = 0;
  autocompleteByDepartment_ulHeight: number = 0;
  autocompleteByLocation_ulHeight: number = 0;
  filtered: IProfile[];
  @Input() profileFromSearch: string;
  ul: Element;
  searchByEmployeeImgSrc: string = '';
  searchByDepartmentImgSrc: string = '';
  searchByLocationImgSrc: string = '';
  isShowFooterForAutocomplete: boolean = false;
  smallAutocomplete: boolean = false;
  miniAutocomplete: boolean = false;
  onlyFooter: boolean = false;
  lastElement: boolean = false;

  constructor(private fb: FormBuilder,
              private searchByEmployeeService: SearchByEmployeeService,
              private searchByDepartmentService: SearchByDepartmentService,
              private searchByLocationService: SearchByLocationService,
              private searchByAzService: SearchByAzService,
              private saveSearchCharService: SaveSearchCharService,
              private clearAllService: ClearAllService,
              private sortService: SortService,
              private renderer: Renderer2,
              private passService: PassCharService,
              private cdr: ChangeDetectorRef) {
  }

  // @HostListener('scroll', ['$event'])
  // onScroll(event: any) {
  //   console.log(event);
  //   // visible height + pixel scrolled >= total height
  //   if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
  //     console.log('End');
  //     this.lastElement = true;
  //   } else {
  //     this.lastElement = false;
  //   }
  // }

  @HostListener('document:click', ['$event'])
  handleOutsideClickForLocations(event) {

    if (!this.autocompleteLocationsRef.nativeElement.contains(event.target)) {
      this.showAutocompleteByLocation = false;

    }
    if (!this.autocompleteDepartmentsRef.nativeElement.contains(event.target)) {
      this.showAutocompleteByDepartment = false;
    }
    if (!this.autocompleteEmployeeRef.nativeElement.contains(event.target)) {
      console.log('a');
      this.showAutocompleteByEmployee = false;
      // this.selectedUser = this.byEmployee.value;
      // this.byEmployee.patchValue(this.selectedUser);
      this.cdr.detectChanges();

    }
  }

  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.lastElement = true;
    } else {
      this.lastElement = false;
    }
  }

  ngOnInit() {
    this.imgSrc = environment.azIcon;
    this.searchByEmployeeImgSrc = environment.searchByEmployeeIcon;
    this.searchByDepartmentImgSrc = environment.searchByDepartmentIcon;
    this.searchByLocationImgSrc = environment.searchByLocationIcon;
    this.initializeSearchForm();

    if (this.profileFromSearch) {
      this.showAutocompleteByEmployee = false;
      this.byEmployee.patchValue(this.profileFromSearch);
      this.searchByEmployeeService.setSearch({
        type: 'byEmployee',
        value: this.profileFromSearch || '',
        deleteClick: false
      });
      this.cdr.detectChanges();

    } else {
      this.onSearchByEmployee();
    }

  }

  /**
   * Initialize searchForm
   */
  initializeSearchForm() {
    this.searchForm = this.fb.group({
      byEmployee: [''],
      byDepartment: [''],
      byLocation: ['']
    });
  }

  /**
   * Change height of searchbar(autocomplete) dynamically
   */
  changeHeightOfAutocompleteByEmployeeDynamically() {

    if (this.showAutocompleteByEmployee) {
      setTimeout(() => {
        this.autocompleteByEmployee_ulHeight = 2;
        const virtualScroll = document.querySelector('.users');
        if (virtualScroll !== null) {
          const vsChildren = virtualScroll.children;
          const children = vsChildren[0].children;
          const ul = children[0];
          for (let i = 0; i < ul.children.length; i++) {
            if (i <= 4) {
              this.autocompleteByEmployee_ulHeight += (<HTMLElement>ul.children[i]).getBoundingClientRect().height;
              this.cdr.detectChanges();
            }
          }
        }

      }, 500);

    }

  }

  changeHeightOfAutoCompleteByDepartment() {

    setTimeout(() => {
      this.autocompleteByDepartment_ulHeight = 3;
      const autocomplete = document.querySelector('.autocomplete__departments');

      const vsChildren = autocomplete.children;
      const children = vsChildren[0].children;
      for (let i = 0; i < children.length; i++) {
        if (i <= 4) {
          this.autocompleteByDepartment_ulHeight += (<HTMLElement>children[i]).getBoundingClientRect().height;
          this.cdr.detectChanges();
        }
      }
    }, 500);

  }

  changeHeightOfAutoCompleteByLocation() {
    if (this.showAutocompleteByLocation) {
      setTimeout(() => {
        this.autocompleteByLocation_ulHeight = 3;
        const autocomplete = document.querySelector('.autocomplete__locations');
        const vsChildren = autocomplete.children;
        if (vsChildren) {
          console.log('auto', vsChildren);
          const children = vsChildren[0].children;
          for (let i = 0; i < children.length; i++) {
            if (i <= 4) {
              this.autocompleteByLocation_ulHeight += (<HTMLElement>children[i]).getBoundingClientRect().height;
              this.cdr.detectChanges();
            }
          }
        }

      }, 500);
    }

  }

  ngAfterViewInit() {
  }

  get byEmployee() {
    return this.searchForm.get('byEmployee');
  }

  get byDepartment() {
    return this.searchForm.get('byDepartment');
  }

  get byLocation() {
    return this.searchForm.get('byLocation');
  }

  /**
   * select profile
   * pass the selected profile value to the 'Search service'
   */
  onSearchByEmployee() {
    this.profileFromSearch = '';
    this.showAutocompleteByEmployee = this.byEmployee.value !== '';
    this.selectedUser = this.byEmployee.value;
    this.byEmployee.patchValue(this.selectedUser);


    this.changeHeightOfAutocompleteByEmployeeDynamically();
    this.searchByEmployeeService.setSearch({
      type: 'byEmployee',
      value: this.byEmployee.value || '',
      deleteClick: false
    });
    this.cdr.detectChanges();

  }

  /**
   * Select department
   * pass the selected profile value to the service setSearch
   */
  onSearchByDepartment() {
    this.showAutocompleteByDepartment = true;
    this.searchByDepartmentService.setSearch({
      type: 'byDepartment',
      value: this.byDepartment.value || '',
      deleteClick: false
    });
    this.changeHeightOfAutoCompleteByDepartment();
  }

  /**
   * Select location
   * pass the selected location value to the service setSearch
   */
  onSearchByLocation() {
    this.showAutocompleteByLocation = true;
    this.searchByLocationService.setSearch({type: 'byLocation', value: this.byLocation.value, deleteClick: false});
    this.changeHeightOfAutoCompleteByLocation();
    this.cdr.detectChanges();
  }

  /**
   * Click on selected location
   * pass the selected department value to the service setSearch
   * @param department: string
   */
  onSelectDepartment(department: string) {
    this.byDepartment.patchValue(department);
    this.showAutocompleteByDepartment = false;

    this.searchByDepartmentService.setSearch({type: 'byDepartment', value: department || '', deleteClick: false});
    this.cdr.detectChanges();
  }

  /**
   * Click on selected location
   * pass the value to the service setSearch
   * @param office:string
   */
  onSelectLocation(office: string) {
    this.byLocation.patchValue(office);
    this.searchByLocationService.setSearch({
      type: 'byLocation',
      value: this.byLocation.value || '',
      deleteClick: false
    });
    this.showAutocompleteByLocation = false;
    this.cdr.detectChanges();
  }

  /**
   * Click on Sort icon in input
   */
  // onSort() {
  //   this.count++;
  //   if (this.count % 2 === 0) {
  //     this.sortService.setOrder('asc');
  //     this.imgSrc = environment.zaIcon;
  //     this.cdr.detectChanges();
  //   } else {
  //     this.sortService.setOrder('desc');
  //     this.imgSrc = environment.azIcon;
  //     this.cdr.detectChanges();
  //   }
  // }

  /**
   * Choose employee and show him in input
   * @param profile: IProfile
   */
  onSelectUser(profile: IProfile) {
    this.selectedUser = profile.FirstName + ' ' + profile.LastName;
    this.byEmployee.patchValue(this.selectedUser);
    this.searchByEmployeeService.setSearch({
      type: 'byEmployee',
      value: this.byEmployee.value || '',
      deleteClick: false
    });
    this.profileFromSearch = '';
    this.autocompleteByEmployee_ulHeight = 0;
    this.showAutocompleteByEmployee = false;

    this.cdr.detectChanges();
  }

  /**
   * Click on 'Clear icon' to clear the 'Employee input'
   */
  onClearInputByEmployee() {
    if (this.profileFromSearch !== '') {
      this.profileFromSearch = '';
      this.byEmployee.patchValue('');
      this.cdr.detectChanges();

    }
    this.showAutocompleteByEmployee = false;
    this.byEmployee.patchValue('');
    this.searchByEmployeeService.setSearch({type: 'byEmployee', value: this.byEmployee.value || '', deleteClick: true});
    this.cdr.detectChanges();

  }

  /**
   * Click on 'Clear icon' to clear the 'Department input'
   */
  onClearDepartmentInput() {
    if (this.profileFromSearch) {
      this.showAutocompleteByDepartment = false;
    }
    this.showAutocompleteByDepartment = false;
    this.byDepartment.patchValue('');
    this.searchByDepartmentService.setSearch({
      type: 'byDepartment',
      value: this.byDepartment.value || '',
      deleteClick: true
    });
    this.cdr.detectChanges();
  }

  /**
   * Click on 'Clear icon' to clear the 'Location input and s'
   */
  onClearLocationInput() {
    this.byLocation.patchValue('');
    this.searchByLocationService.setSearch({type: 'byLocation', value: this.byLocation.value || '', deleteClick: true});
    this.showAutocompleteByLocation = false;
    this.cdr.detectChanges();
  }

  /**
   * CLick on 'Clear all' button  to clear all the inputs
   */
  onClearAllInputs() {
    this.byEmployee.patchValue('');
    this.byDepartment.patchValue('');
    this.byLocation.patchValue('');

    this.searchByLocationService.setSearch({type: 'byLocation', value: this.byLocation.value || '', deleteClick: true});
    this.searchByDepartmentService.setSearch({
      type: 'byDepartment',
      value: this.byDepartment.value || '',
      deleteClick: true
    });
    this.searchByEmployeeService.setSearch({type: 'byEmployee', value: this.byEmployee.value || '', deleteClick: true});
    this.clearAllService.setSearch({type: 'clearAll', value: '', deleteClick: true});
    this.cdr.detectChanges();
  }

  onEnterSelectProfile(profile: string) {
    this.searchByEmployeeService.setSearch({
      type: 'byEmployee',
      value: profile || '',
      deleteClick: false
    });
    this.profileFromSearch = '';
    this.autocompleteByEmployee_ulHeight = 0;
    this.showAutocompleteByEmployee = false;

    this.cdr.detectChanges();
  }
}
