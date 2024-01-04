import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainNavRoutingModule } from './main-nav-routing.module';
import { MainNavComponent } from './main-nav.component';


import { MatToolbarModule } from '@angular/material/toolbar';
//import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
//import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
//import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
//import { FlexLayoutModule } from '@angular/flex-layout';
//import { SharedModule } from './shared/shared/shared.module';


@NgModule({
  declarations: [
    MainNavComponent
  ],
  imports: [
    CommonModule,
    MainNavRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatMenuModule,
    //FlexLayoutModule
  ]
})
export class MainNavModule { }
