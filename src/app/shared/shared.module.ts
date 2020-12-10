import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    LoadingComponent
  ],
})
export class SharedModule { }
