import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcollectorsDetailJsonComponent } from './vcollectors-detail-json.component';

describe('VcollectorsDetailJsonComponent', () => {
  let component: VcollectorsDetailJsonComponent;
  let fixture: ComponentFixture<VcollectorsDetailJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcollectorsDetailJsonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VcollectorsDetailJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
