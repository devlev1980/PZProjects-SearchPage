import { TestBed } from '@angular/core/testing';

import { SearchByLocationService } from './search-by-location.service';

describe('SearchByLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchByLocationService = TestBed.get(SearchByLocationService);
    expect(service).toBeTruthy();
  });
});
