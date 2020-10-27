import { TestBed } from '@angular/core/testing';

import { SearchByAzService } from './search-by-az.service';

describe('SearchByAzService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchByAzService = TestBed.get(SearchByAzService);
    expect(service).toBeTruthy();
  });
});
