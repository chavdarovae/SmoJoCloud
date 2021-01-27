import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { MessagesComponent } from './messages/messages.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
<<<<<<< HEAD
    LoadingComponent
=======
    LoadingComponent,
    MessagesComponent
>>>>>>> b0023a3fe560f441fb3f068b72672ecae91e12c0
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
<<<<<<< HEAD
    LoadingComponent
=======
    LoadingComponent,
    MessagesComponent
>>>>>>> b0023a3fe560f441fb3f068b72672ecae91e12c0
  ],
})
export class SharedModule { }
