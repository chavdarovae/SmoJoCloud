import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserModifyComponent } from './user-modify/user-modify.component';
import { JobsModule } from '../jobs/jobs.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserModifyComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    JobsModule
  ],
  exports: [
    UserProfileComponent,
    UserModifyComponent
  ]
})
export class UserModule { }
