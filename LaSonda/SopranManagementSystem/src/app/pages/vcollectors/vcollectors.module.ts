import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VcollectorsRoutingModule } from './vcollectors-routing.module';
import { VcollectorsComponent } from './vcollectors/vcollectors.component';

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
import { VcollectorsDetailJsonComponent } from './vcollectors-detail-json/vcollectors-detail-json.component';


@NgModule({
  declarations: [
    VcollectorsComponent,
    VcollectorsDetailJsonComponent
  ],
  imports: [
    CommonModule,
    VcollectorsRoutingModule,
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
export class VcollectorsModule { }
