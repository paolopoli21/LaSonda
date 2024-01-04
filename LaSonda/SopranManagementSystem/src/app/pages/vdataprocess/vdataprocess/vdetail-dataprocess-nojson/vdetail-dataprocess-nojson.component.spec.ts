import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VdetailDataprocessNojsonComponent } from './vdetail-dataprocess-nojson.component';

describe('VdetailDataprocessNojsonComponent', () => {
  let component: VdetailDataprocessNojsonComponent;
  let fixture: ComponentFixture<VdetailDataprocessNojsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VdetailDataprocessNojsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VdetailDataprocessNojsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
