import {
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
import {Subscription} from 'rxjs';
import {IProfile} from '../../models/profile.model';
import {environment} from '../../../environments/environment';
import {ILocation} from '../../search-page-spfx-web-part/search-page-spfx-web-part.component';
import {PassCharService} from '../../services/pass-char.service';
import {SearchByDepartmentService} from '../../services/search-by-department.service';
import {SearchByLocationService} from '../../services/search-by-location.service';
import {SearchByAzService} from '../../services/search-by-az.service';
import {ClearAllService} from '../../services/clear-all.service';
import {SaveSearchCharService} from '../../services/save-search-char.service';
import {SearchByEmployeeEnterService} from '../../services/search-by-employee-enter.service';

@Component({
  selector: 'app-search-by',
  templateUrl: './search-by.component.html',
  styleUrls: ['./search-by.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchByComponent implements OnInit {
  @Input() departments: string[] = [];
  @Input() locations: ILocation[];
  @Input() profiles: IProfile[];
  @Input() profileFromSearch: string;
  searchForm: FormGroup;
  click$: Subscription;
  count: number = 1;
  imgSrc: string = '';
  DescIcon: boolean;
  showAutocompleteByDepartment: boolean = false;
  showAutocompleteByLocation: boolean = false;
  showAutocompleteByEmployee: boolean = false;
  isShow: boolean = true;
  selectedUser: string = '';
  autocompleteByEmployee_ulHeight: number = 0;
  autocompleteByDepartment_ulHeight: number = 0;
  autocompleteByLocation_ulHeight: number = 0;
  filtered: IProfile[];
  ul: Element;
  searchByEmployeeImgSrc: string = '';
  searchByDepartmentImgSrc: string = '';
  searchByLocationImgSrc: string = '';
  isShowFooterForAutocomplete: boolean = false;
  smallAutocomplete: boolean = false;
  miniAutocomplete: boolean = false;
  onlyFooter: boolean = false;
  lastElement: boolean = false;
  @ViewChild('sortBtn', {static: false}) sortBtn: ElementRef;
  @ViewChild('autocompleteDepartmentsRef', {static: false}) autocompleteDepartmentsRef: ElementRef;
  @ViewChild('autocompleteLocationsRef', {static: false}) autocompleteLocationsRef: ElementRef;
  @ViewChild('autocompleteEmployeeRef', {static: false}) autocompleteEmployeeRef: ElementRef;
  @ViewChild('virtualScrollRef', {static: false}) virtualScrollRef: ElementRef;

  constructor(private fb: FormBuilder,
              private searchByEmployeeService: SearchByEmployeeService,
              private searchByDepartmentService: SearchByDepartmentService,
              private searchByLocationService: SearchByLocationService,
              private searchByAzService: SearchByAzService,
              private saveSearchCharService: SaveSearchCharService,
              private searchByEmployeeEnterService: SearchByEmployeeEnterService,
              private clearAllService: ClearAllService,
              private sortService: SortService,
              private renderer: Renderer2,
              private passService: PassCharService,
              private cdr: ChangeDetectorRef) {
  }

  /**
   * Click outside of the autocompletes 'by Employee','by Department,'by Location'
   * @param event
   */
  @HostListener('document:click', ['$event'])
  handleOutsideClickForLocations(event) {
    if (!this.autocompleteLocationsRef.nativeElement.contains(event.target)) {
      this.showAutocompleteByLocation = false;
    }
    if (!this.autocompleteDepartmentsRef.nativeElement.contains(event.target)) {
      this.showAutocompleteByDepartment = false;
    }
    if (!this.autocompleteEmployeeRef.nativeElement.contains(event.target)) {
      this.showAutocompleteByEmployee = false;
      this.selectedUser = this.byEmployee.value;
      this.byEmployee.patchValue(this.selectedUser);
      this.cdr.detectChanges();
    }
  }

  /**
   * Find last element in autocomplete on scroll
   * @param event: any
   */
  onScroll(event: any) {
    this.lastElement = event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight;
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
   * Change height of autocomplete (by Employee) dynamically
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

  /**
   * Change height of autocomplete (by Department) dynamically
   */
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

  /**
   * Change height of autocomplete (by Location) dynamically
   */
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

  /**
   * select profile
   * pass the selected profile value to the 'Search service'
   */
  onSearchByEmployee() {
    this.profileFromSearch = '';
    this.showAutocompleteByEmployee = this.byEmployee.value !== '';
    if (this.byEmployee.value === '') {
      this.searchByEmployeeService.setSearch({
        type: 'byEmployee',
        value: this.byEmployee.value || '',
        deleteClick: true
      });
    }
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
    this.searchByEmployeeService.setSearch({
      type: 'byEmployee',
      value: this.byEmployee.value || '',
      deleteClick: true
    });

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

  /**
   * Click on Enter to select profile
   * @param value: string
   */
  onEnterSelectProfile(value: string) {
    this.searchByEmployeeEnterService.setSearch({
      type: 'onEnter',
      value: value,
      deleteClick: false
    });
    this.profileFromSearch = '';
    this.autocompleteByEmployee_ulHeight = 0;
    this.showAutocompleteByEmployee = false;
    this.cdr.detectChanges();
  }
}
