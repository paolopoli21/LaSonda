import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { DetailMonitoringComponent } from './monitoring/detail-monitoring/detail-monitoring.component';


import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input'; 
import { MatSortModule } from '@angular/material/sort';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';


@NgModule({
  declarations: [
    MonitoringComponent,
    DetailMonitoringComponent
  ],
  imports: [
    CommonModule,
    MonitoringRoutingModule,
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
    MatCardModule
  ]
})
export class MonitoringModule { }
