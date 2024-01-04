import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailprocessNojsonComponent } from './detailprocess-nojson.component';

describe('DetailprocessNojsonComponent', () => {
  let component: DetailprocessNojsonComponent;
  let fixture: ComponentFixture<DetailprocessNojsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailprocessNojsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailprocessNojsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
