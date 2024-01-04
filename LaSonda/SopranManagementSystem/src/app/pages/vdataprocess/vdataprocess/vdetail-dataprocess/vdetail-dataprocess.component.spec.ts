import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VdetailDataprocessComponent } from './vdetail-dataprocess.component';

describe('VdetailDataprocessComponent', () => {
  let component: VdetailDataprocessComponent;
  let fixture: ComponentFixture<VdetailDataprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VdetailDataprocessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VdetailDataprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
