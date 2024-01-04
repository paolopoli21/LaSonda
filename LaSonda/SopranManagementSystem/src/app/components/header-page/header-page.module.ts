import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderPageRoutingModule } from './header-page-routing.module';
import { HeaderPageComponent } from './header-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    HeaderPageComponent
  ],
  imports: [
    CommonModule,
    HeaderPageRoutingModule,
    MatToolbarModule,

  ],
  exports:
  [
  HeaderPageComponent
  ]
})
export class HeaderPageModule { }
