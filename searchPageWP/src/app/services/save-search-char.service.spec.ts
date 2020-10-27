import { TestBed } from '@angular/core/testing';

import { SaveSearchCharService } from './save-search-char.service';

describe('SaveSearchCharService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveSearchCharService = TestBed.get(SaveSearchCharService);
    expect(service).toBeTruthy();
  });
});
