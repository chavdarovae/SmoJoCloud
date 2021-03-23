import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { MessagesComponent } from './messages/messages.component';
import { MaterialModule } from '../material/material.module';
import { EmailToNamePipe } from './pipes/email-to-name.pipe';



@NgModule({
  declarations: [
    LoadingComponent,
    MessagesComponent,
    EmailToNamePipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LoadingComponent,
    MessagesComponent,
    EmailToNamePipe
  ],
})
export class SharedModule { }
