import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MockService} from '../services/mock.service';
import {IEmployee} from '../models/employee';

@Component({
  selector: 'app-search-page-spfx-web-part',
  templateUrl: './search-page-spfx-web-part.component.html',
  styleUrls: ['./search-page-spfx-web-part.component.scss'],
})
export class SearchPageSpfxWebPartComponent implements OnInit {
  @Input() description: string;
  employeeList: IEmployee[] = [];
  AZ_characters: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor(private employeeService: MockService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.employeeService.getEmployeeList().subscribe((data) => this.employeeList = data);

  }

}
