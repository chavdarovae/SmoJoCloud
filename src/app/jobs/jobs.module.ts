import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobRoutingModule } from './job-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [JobListComponent],
  imports: [
    CommonModule,
    JobRoutingModule,
    MaterialModule
  ],
  exports: [JobListComponent],

})
export class JobsModule { }
