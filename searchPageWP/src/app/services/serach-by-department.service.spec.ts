import { TestBed } from '@angular/core/testing';

import { SearchByDepartmentService } from './search-by-department.service';

describe('SerachByDepartmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchByDepartmentService = TestBed.get(SearchByDepartmentService);
    expect(service).toBeTruthy();
  });
});
