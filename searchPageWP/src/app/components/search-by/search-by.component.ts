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
import {SearchByEmployeeService} from '../../services/searchByEmployee.service';
import {SortService} from '../../services/sort.service';
import {fromEvent, Subscription} from 'rxjs';
import {IProfile} from '../../models/profile.model';
import {environment} from '../../../environments/environment';
import {ILocation} from '../../search-page-spfx-web-part/search-page-spfx-web-part.component';
import {PassCharService} from '../../services/pass-char.service';

@Component({
  selector: 'app-search-by',
  templateUrl: './search-by.component.html',
  styleUrls: ['./search-by.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchByComponent implements OnInit, AfterViewInit {
  @Input() departments: string[] = [];
  @Input() locations: string[] = [];
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
  ulHeight: number = 0;
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
              private searchService: SearchByEmployeeService,
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
      this.showAutocompleteByEmployee = false;
      this.selectedUser = this.byEmployee.value;
      this.byEmployee.patchValue(this.selectedUser);
      this.showAutocompleteByEmployee = this.byEmployee.value !== '';

    }
  }

  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log('End');
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
      this.searchService.setSearch({type: 'byEmployee', value: this.profileFromSearch || ''});
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
  changeHeightOfAutocompleteDynamically() {

    if (this.showAutocompleteByEmployee) {
      setTimeout(() => {
        this.ulHeight = 2;
        const virtualScroll = document.querySelector('.users');
        if (virtualScroll !== null) {
          const vsChildren = virtualScroll.children;
          const children = vsChildren[0].children;
          const ul = children[0];
          for (let i = 0; i < ul.children.length; i++) {
            if (i <= 4) {
              this.ulHeight += (<HTMLElement>ul.children[i]).getBoundingClientRect().height;
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

    this.changeHeightOfAutocompleteDynamically();
    this.searchService.setSearch({type: 'byEmployee', value: this.byEmployee.value || ''});
    this.cdr.detectChanges();

  }

  /**
   * Select department
   * pass the selected profile value to the service setSearch
   */
  onSearchByDepartment() {
    this.showAutocompleteByDepartment = true;
    this.searchService.setSearch({type: 'byDepartment', value: ''});
    this.cdr.detectChanges();
  }

  /**
   * Select location
   * pass the selected location value to the service setSearch
   */
  onSearchByLocation() {
    this.searchService.setSearch({type: 'byLocation', value: ''});
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
    this.searchService.setSearch({type: 'byDepartment', value: department || ''});
    this.cdr.detectChanges();
  }

  /**
   * Click on selected location
   * pass the value to the service setSearch
   * @param office:string
   */
  onSelectLocation(office: string) {
    this.showAutocompleteByLocation = false;
    this.byLocation.patchValue(office);
    this.searchService.setSearch({type: 'byLocation', value: office || ''});
    this.cdr.detectChanges();
  }

  /**
   * Click on Sort icon in input
   */
  onSort() {
    this.count++;
    if (this.count % 2 === 0) {
      this.sortService.setOrder('asc');
      this.imgSrc = environment.zaIcon;
      this.cdr.detectChanges();
    } else {
      this.sortService.setOrder('desc');
      this.imgSrc = environment.azIcon;
      this.cdr.detectChanges();
    }
  }

  /**
   * Choose employee and show him in input
   * @param profile: IProfile
   */
  onSelectUser(profile: IProfile) {
    this.selectedUser = profile.FirstName + ' ' + profile.LastName;
    this.byEmployee.patchValue(this.selectedUser);
    this.searchService.setSearch({type: 'byEmployee', value: this.byEmployee.value || ''});
    this.profileFromSearch = '';
    this.ulHeight = 0;
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
    this.searchService.setSearch({type: 'byEmployee', value: this.byEmployee.value || ''});
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
    this.searchService.setSearch({type: 'byDepartment', value: this.byDepartment.value || ''});
    this.cdr.detectChanges();
  }

  /**
   * Click on 'Clear icon' to clear the 'Location input'
   */
  onClearLocationInput() {
    this.showAutocompleteByLocation = false;
    this.byLocation.patchValue('');
    this.searchService.setSearch({type: 'byLocation', value: this.byLocation.value || ''});
    this.cdr.detectChanges();
  }

  /**
   * CLick on 'Clear all' button  to clear all the inputs
   */
  onClearAllInputs() {
    this.byEmployee.patchValue('');
    this.byDepartment.patchValue('');
    this.byLocation.patchValue('');
    this.searchService.setSearch({type: 'byLocation', value: this.byLocation.value || ''});
    this.searchService.setSearch({type: 'byDepartment', value: this.byDepartment.value || ''});
    this.searchService.setSearch({type: 'byEmployee', value: this.byEmployee.value || ''});
    this.cdr.detectChanges();
  }

}
