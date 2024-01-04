import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
//import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
//import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
//import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input'; 
//import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
//import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { VdetailDataprocessComponent } from './vdataprocess/vdetail-dataprocess/vdetail-dataprocess.component';
import { VdataprocessComponent } from './vdataprocess/vdataprocess.component';
import { VdataprocessRoutingModule } from './vdataprocess-routing.module';
import { VdetailDataprocessNojsonComponent } from './vdataprocess/vdetail-dataprocess-nojson/vdetail-dataprocess-nojson.component';
//import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatSortModule } from '@angular/material/sort';
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

//import { MatTableExporterModule } from 'mat-table-exporter';

//import { MatTableExporterModule } from 'mat-table-exporter';


@NgModule({
  declarations: [
    VdataprocessComponent,
    VdetailDataprocessComponent,
    VdetailDataprocessNojsonComponent
  ],
  imports: [
    CommonModule,
    VdataprocessRoutingModule,
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
   //MatTableExporterModule,
   HeaderPageModule
  ]
})
export class VdataprocessModule { }
