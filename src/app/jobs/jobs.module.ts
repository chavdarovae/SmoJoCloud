import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobRoutingModule } from './job.routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JobNewComponent } from './job-new/job-new.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { JobCardComponent } from './job-card/job-card.component';
import { JobMyComponent } from './job-my/job-my.component';


@NgModule({
  declarations: [
    JobListComponent, 
    JobNewComponent,
    JobCardComponent,
    JobMyComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    FontAwesomeModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    JobListComponent, 
    JobNewComponent,
    JobCardComponent,
    JobMyComponent
  ],

})
export class JobsModule { }
