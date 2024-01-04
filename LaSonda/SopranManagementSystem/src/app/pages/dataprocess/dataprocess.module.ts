import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataprocessRoutingModule } from './dataprocess-routing.module';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input'; 
import { MatSortModule } from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';

import { DataprocessComponent } from './dataprocess/dataprocess.component';
import { DetailDataprocessComponent } from './dataprocess/detail-dataprocess/detail-dataprocess.component';
import { DetailprocessNojsonComponent } from './dataprocess/detailprocess-nojson/detailprocess-nojson.component';


@NgModule({
  declarations: [
    DataprocessComponent,
    DetailDataprocessComponent,
    DetailprocessNojsonComponent
  ],
  imports: [
    CommonModule,
    DataprocessRoutingModule,
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
export class DataprocessModule { }
