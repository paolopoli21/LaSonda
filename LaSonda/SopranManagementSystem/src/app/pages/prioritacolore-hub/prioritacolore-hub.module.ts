import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrioritacoloreHubRoutingModule } from './prioritacolore-hub-routing.module';
import { PrioritacoloreHubComponent } from './prioritacolore-hub/prioritacolore-hub.component';

// import { VdetailDataprocessComponent } from '../vdataprocess/vdataprocess/vdetail-dataprocess/vdetail-dataprocess.component';
// import { VdetailDataprocessNojsonComponent } from '../vdataprocess/vdataprocess/vdetail-dataprocess-nojson/vdetail-dataprocess-nojson.component';

import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input'; 
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { DetailProcessJsonComponent } from './prioritacolore-hub/detail-process-json/detail-process-json.component';
import { DetailProcessNojsonComponent } from './prioritacolore-hub/detail-process-nojson/detail-process-nojson.component';


@NgModule({
  declarations: [
    PrioritacoloreHubComponent,
    DetailProcessJsonComponent,
    DetailProcessNojsonComponent,
    // VdetailDataprocessComponent,
    // VdetailDataprocessNojsonComponent
  ],
  imports: [
    CommonModule,
    PrioritacoloreHubRoutingModule,
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
export class PrioritacoloreHubModule { }
