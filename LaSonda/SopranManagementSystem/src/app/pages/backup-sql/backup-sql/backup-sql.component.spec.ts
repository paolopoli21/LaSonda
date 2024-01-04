import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupSqlComponent } from './backup-sql.component';

describe('BackupSqlComponent', () => {
  let component: BackupSqlComponent;
  let fixture: ComponentFixture<BackupSqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackupSqlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackupSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
