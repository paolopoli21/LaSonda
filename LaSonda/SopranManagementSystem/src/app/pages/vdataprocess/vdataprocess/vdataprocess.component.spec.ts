import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VdataprocessComponent } from './vdataprocess.component';

describe('VdataprocessComponent', () => {
  let component: VdataprocessComponent;
  let fixture: ComponentFixture<VdataprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VdataprocessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VdataprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
