import { TestBed } from '@angular/core/testing';

import { MonitoringHubService } from './monitoring-hub.service';

describe('MonitoringHubService', () => {
  let service: MonitoringHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoringHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
