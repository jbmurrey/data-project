import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {HttpClientModule} from '@angular/common/http'
import { SharedModule } from '../shared/shared.module';
import { SignoutComponent } from './signout/signout.component';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    SignoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class AuthModule { }
