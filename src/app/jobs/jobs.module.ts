import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobRoutingModule } from './job.routing.module';
import { JobNewComponent } from './job-new/job-new.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { JobCardComponent } from './job-card/job-card.component';
import { JobMyComponent } from './job-my/job-my.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    JobListComponent, 
    JobNewComponent,
    JobCardComponent,
    JobMyComponent,
    JobDetailsComponent,
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    JobListComponent, 
    JobNewComponent,
    JobCardComponent,
    JobMyComponent,
    JobDetailsComponent,
  ],

})
export class JobsModule { }
