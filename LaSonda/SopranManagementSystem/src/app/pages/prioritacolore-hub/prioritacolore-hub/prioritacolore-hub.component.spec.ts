import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritacoloreHubComponent } from './prioritacolore-hub.component';

describe('PrioritacoloreHubComponent', () => {
  let component: PrioritacoloreHubComponent;
  let fixture: ComponentFixture<PrioritacoloreHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrioritacoloreHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritacoloreHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
