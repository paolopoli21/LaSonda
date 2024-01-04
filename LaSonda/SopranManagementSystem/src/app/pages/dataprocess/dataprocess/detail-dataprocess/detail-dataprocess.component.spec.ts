import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDataprocessComponent } from './detail-dataprocess.component';

describe('DetailDataprocessComponent', () => {
  let component: DetailDataprocessComponent;
  let fixture: ComponentFixture<DetailDataprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDataprocessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDataprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
