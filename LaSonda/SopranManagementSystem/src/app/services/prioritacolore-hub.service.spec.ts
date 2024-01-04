import { TestBed } from '@angular/core/testing';

import { PrioritacoloreHubService } from './prioritacolore-hub.service';

describe('PrioritacoloreHubService', () => {
  let service: PrioritacoloreHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrioritacoloreHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
