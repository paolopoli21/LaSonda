import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracerRoutingModule } from './tracer-routing.module';
import { TracerComponent } from './tracer/tracer.component';


@NgModule({
  declarations: [
    TracerComponent
  ],
  imports: [
    CommonModule,
    TracerRoutingModule
  ]
})
export class TracerModule { }
