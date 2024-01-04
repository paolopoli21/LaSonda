import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackupSqlRoutingModule } from './backup-sql-routing.module';
import { BackupSqlComponent } from './backup-sql/backup-sql.component';

//import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
//import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
//import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
//import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input'; 
import { MatSortModule } from '@angular/material/sort';
//import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
//import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
//import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { HeaderPageModule } from 'src/app/components/header-page/header-page.module';
//import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
//import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';



@NgModule({
  declarations: [
    BackupSqlComponent
  ],
  imports: [
    CommonModule,
    BackupSqlRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    HeaderPageModule
  ]
})
export class BackupSqlModule { }
