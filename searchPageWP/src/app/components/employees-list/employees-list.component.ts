import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MockService} from '../../services/mock.service';
import {IEmployee} from '../../models/employee';
import {ISearchTerm, SearchService} from '../../services/search.service';
import {MatMenuTrigger, MenuPositionX, MenuPositionY} from '@angular/material/menu';
import {SortService} from '../../services/sort.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  @Input() employeeList: IEmployee[];
  searchTerm: ISearchTerm = {type: '', value: ''};
  byEmployeeTerm: string;
  byDepartmentTerm: string;
  byLocation: string;
  byAZ: string;
  @ViewChild('menu') menu: MatMenuTrigger;
   totalItems: number;
   currentPage: number = 1;

  constructor(private employeeService: MockService,
              private searchService: SearchService,
              private sortService: SortService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  this.totalItems = this.employeeList.length;

    this.searchService.getSearch().subscribe((searchTerm) => {
      switch (searchTerm.type) {
        case 'byEmployee':
          this.byEmployeeTerm = searchTerm.value;
          break;
        case 'byDepartment':
          this.byDepartmentTerm = searchTerm.value;
          break;
        case 'byLocation':
          this.byLocation = searchTerm.value;
          break;
        case 'byAZ':
          this.byAZ = searchTerm.value;
          break;
      }
    });

    this.sortService.getOrder().subscribe(order => {
      if (order === 'asc') {
        this.employeeList = this.employeeList.sort();

      } else if (order === 'desc') {
        this.employeeList = this.employeeList.sort().reverse();
      }
    });

  }

  pageChanged($event: number) {

  }
}
