import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    InputComponent
  ]
})
export class SharedModule { }
