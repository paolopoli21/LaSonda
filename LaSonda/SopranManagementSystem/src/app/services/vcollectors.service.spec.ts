import { TestBed } from '@angular/core/testing';

import { VcollectorsService } from './vcollectors.service';

describe('VcollectorsService', () => {
  let service: VcollectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcollectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
