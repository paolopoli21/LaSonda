import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProcessJsonComponent } from './detail-process-json.component';

describe('DetailProcessJsonComponent', () => {
  let component: DetailProcessJsonComponent;
  let fixture: ComponentFixture<DetailProcessJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailProcessJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProcessJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
