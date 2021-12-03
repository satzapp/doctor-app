import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    MaterialModule
  ]
})
export class DoctorModule { }
