import { TestBed } from '@angular/core/testing';

import { SelectdbService } from './selectdb.service';

describe('SelectdbService', () => {
  let service: SelectdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
