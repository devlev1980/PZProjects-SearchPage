import { TestBed } from '@angular/core/testing';

import { PassCharService } from './pass-char.service';

describe('PassCharService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassCharService = TestBed.get(PassCharService);
    expect(service).toBeTruthy();
  });
});
