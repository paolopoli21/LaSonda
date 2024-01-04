import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringHubComponent } from './monitoring-hub.component';

describe('MonitoringHubComponent', () => {
  let component: MonitoringHubComponent;
  let fixture: ComponentFixture<MonitoringHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
