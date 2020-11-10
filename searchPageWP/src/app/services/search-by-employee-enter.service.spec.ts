import { TestBed } from '@angular/core/testing';

import { SearchByEmployeeEnterService } from './search-by-employee-enter.service';

describe('SearchByEmployeeEnterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchByEmployeeEnterService = TestBed.get(SearchByEmployeeEnterService);
    expect(service).toBeTruthy();
  });
});
