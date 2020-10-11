import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchService} from '../../services/search.service';
import {SortService} from '../../services/sort.service';
import {Subscription} from 'rxjs';
import {IProfile} from '../../models/profile.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-search-by',
  templateUrl: './search-by.component.html',
  styleUrls: ['./search-by.component.scss'],
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
  isShow: boolean = true;
  selectedUser: string = '';
  private isAscendingSort: boolean = false;

  constructor(private fb: FormBuilder,
              private searchService: SearchService,
              private sortService: SortService,
              private renderer: Renderer2,
              private cdr: ChangeDetectorRef) {
  }


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
    }
  }


  ngOnInit() {
    this.imgSrc = environment.azIcon;
    this.initializeSearchForm();
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
   * pass the selected profile value to the service setSearch
   */
  onSearchByEmployee() {
    // this.showAutocompleteByEmployee = false;
    // console.log(this.byEmployee.value);
    this.selectedUser = this.byEmployee.value;
    this.showAutocompleteByEmployee = this.byEmployee.value !== '';


    // if (this.byEmployee.value === '') {
    //   this.showAutocompleteByEmployee = false;
    // }


    // this.selectedUser = this.byEmployee.get() + ' ' + profile.LastName;
    // this.showUsers = false;
    this.showAutocompleteByEmployee = false;
    this.byEmployee.patchValue(this.selectedUser);
    this.searchService.setSearch({type: 'byEmployee', value: this.byEmployee.value || ''});
    // TODO: add service for highlight
    this.cdr.detectChanges();

  }
  /**
   * Select department
   * pass the selected profile value to the service setSearch
   */
  onSearchByDepartment() {
    this.showAutocompleteByDepartment = true;
    this.searchService.setSearch({type: 'byDepartment', value: ''});
  }
  /**
   * Select location
   * pass the selected location value to the service setSearch
   */
  onSearchByLocation() {
    this.searchService.setSearch({type: 'byLocation', value: ''});
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

  onSelectUser(profile: IProfile) {

    this.selectedUser = profile.FirstName + ' ' + profile.LastName;
    this.showAutocompleteByEmployee = false;
    this.byEmployee.patchValue(this.selectedUser);
    this.searchService.setSearch({type: 'byEmployee', value: this.byEmployee.value || ''});

    // TODO : redirect to Search page and pass this.selectedUser as parameter

  }
}
