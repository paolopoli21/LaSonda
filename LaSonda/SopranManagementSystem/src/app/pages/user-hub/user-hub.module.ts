import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserHubRoutingModule } from './user-hub-routing.module';
import { UserHubComponent } from './user-hub/user-hub.component';

import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
//import {MatDatepickerModule} from '@angular/material/datepicker';


import { ReactiveFormsModule } from '@angular/forms';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    UserHubComponent
  ],
  imports: [
    CommonModule,
    UserHubRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    //MatDatepickerModule,
    MatNativeDateModule,
    //FlexLayoutModule
  ]
})
export class UserHubModule { }
