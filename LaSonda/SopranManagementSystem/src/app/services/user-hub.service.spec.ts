import { TestBed } from '@angular/core/testing';

import { UserHubService } from './user-hub.service';

describe('UserHubService', () => {
  let service: UserHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
