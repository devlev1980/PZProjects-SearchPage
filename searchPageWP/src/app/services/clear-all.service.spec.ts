import { TestBed } from '@angular/core/testing';

import { ClearAllService } from './clear-all.service';

describe('ClearAllService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClearAllService = TestBed.get(ClearAllService);
    expect(service).toBeTruthy();
  });
});
