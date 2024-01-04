import { TestBed } from '@angular/core/testing';

import { VulneratilityService } from './vulneratility.service';

describe('VulneratilityService', () => {
  let service: VulneratilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VulneratilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
