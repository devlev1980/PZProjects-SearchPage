import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchService} from '../services/search.service';
import {SortService} from '../services/sort.service';
import {fromEvent, Observable} from 'rxjs';

@Component({
  selector: 'app-search-by',
  templateUrl: './search-by.component.html',
  styleUrls: ['./search-by.component.scss']
})
export class SearchByComponent implements OnInit, AfterViewInit {
  searchForm: FormGroup;
  @ViewChild('sortBtn') sortBtn: ElementRef;
  click$: Observable<Event>;
  count: number = 0;
  AscIcon: boolean = true;
  DescIcon: boolean ;

  constructor(private fb: FormBuilder,
              private searchService: SearchService,
              private sortService: SortService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
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

  onSearchByEmployee(event: Event) {
    this.searchService.setSearch({type: 'byEmployee', value: this.byEmployee.value || ''});
  }

  onSearchByDepartment(event: Event) {
    this.searchService.setSearch({type: 'byDepartment', value: this.byDepartment.value || ''});
  }

  onSearchByLocation(event: Event) {
    this.searchService.setSearch({type: 'byLocation', value: this.byDepartment.value || ''});
  }

  onSortEmployees(order: string) {
    this.sortService.setOrder(order);
  }

  ngAfterViewInit() {
    this.click$ = fromEvent(this.sortBtn.nativeElement, 'click');
    this.click$.subscribe(click => {

      this.count++;

      if (this.count % 2 === 0) {
        this.sortService.setOrder('asc');
        this.AscIcon = true;
        this.DescIcon = false;
      } else {
        this.sortService.setOrder('desc');
        this.AscIcon = false;
        this.DescIcon = true;
      }
    });

  }


}
