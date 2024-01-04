import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringRealTimeComponent } from './monitoring-real-time.component';

describe('MonitoringRealTimeComponent', () => {
  let component: MonitoringRealTimeComponent;
  let fixture: ComponentFixture<MonitoringRealTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringRealTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringRealTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
