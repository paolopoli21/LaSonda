import { TestBed } from '@angular/core/testing';

import { MonitoringRealTimeService } from './monitoring-real-time.service';

describe('MonitoringRealTimeService', () => {
  let service: MonitoringRealTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoringRealTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
