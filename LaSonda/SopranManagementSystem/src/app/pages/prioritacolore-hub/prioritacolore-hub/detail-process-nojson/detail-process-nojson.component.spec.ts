import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProcessNojsonComponent } from './detail-process-nojson.component';

describe('DetailProcessNojsonComponent', () => {
  let component: DetailProcessNojsonComponent;
  let fixture: ComponentFixture<DetailProcessNojsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailProcessNojsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProcessNojsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
