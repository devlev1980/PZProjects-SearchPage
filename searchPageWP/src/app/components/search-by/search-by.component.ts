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
  AscIcon: boolean = true;
  DescIcon: boolean;
  showAutocompleteByDepartment: boolean = false;
  showAutocompleteByLocation: boolean = false;
  showAutocompleteByEmployee: boolean = false;
  @ViewChild('autocompleteDepartmentsRef') autocompleteDepartmentsRef: ElementRef;
  @ViewChild('autocompleteLocationsRef') autocompleteLocationsRef: ElementRef;
  @ViewChild('autocompleteEmployeeRef') autocompleteEmployeeRef: ElementRef;
  isShow: boolean = true;
  selectedUser: string = '';

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

  onSearchByEmployee() {
    console.log('On search employee');
    // this.showAutocompleteByEmployee = false;
    // console.log(this.byEmployee.value);
    this.selectedUser = this.byEmployee.value;
    this.showAutocompleteByEmployee = this.byEmployee.value !== '';
    this.cdr.detectChanges();



    // if (this.byEmployee.value === '') {
    //   this.showAutocompleteByEmployee = false;
    // }



    // this.selectedUser = this.byEmployee.get() + ' ' + profile.LastName;
    // this.showUsers = false;
    this.byEmployee.patchValue(this.selectedUser);
    this.searchService.setSearch({type: 'byDepartment', value: this.byEmployee.value || ''});
     // TODO: add service for highlight
  }

  onSearchByDepartment(event: Event) {
    this.showAutocompleteByDepartment = true;
    this.searchService.setSearch({type: 'byDepartment', value: ''});
  }

  onSearchByLocation(event: Event) {
    this.searchService.setSearch({type: 'byLocation', value: ''});
  }

  onSortEmployees(order: string) {
    this.sortService.setOrder(order);
  }


  onSelectDepartment(department: string) {
    this.byDepartment.patchValue(department);
    this.showAutocompleteByDepartment = false;
    this.searchService.setSearch({type: 'byDepartment', value: department || ''});
  }

  onSelectLocation(office: string) {
    this.showAutocompleteByLocation = false;
    this.byLocation.patchValue(office);
    this.searchService.setSearch({type: 'byLocation', value: office || ''});
  }

  onSort() {
    this.count++;
    if (this.count % 2 === 0) {
      this.sortService.setOrder('asc');
    } else {
      this.sortService.setOrder('desc');
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
