import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcollectorsComponent } from './vcollectors.component';

describe('VcollectorsComponent', () => {
  let component: VcollectorsComponent;
  let fixture: ComponentFixture<VcollectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcollectorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VcollectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
