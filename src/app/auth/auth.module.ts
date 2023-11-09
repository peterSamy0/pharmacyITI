import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninAsClientComponent } from './signin-as-client/signin-as-client.component';
import { SignupAsClientComponent } from './signup-as-client/signup-as-client.component';
import { SignupAsPharmacyComponent } from './signup-as-pharmacy/signup-as-pharmacy.component';
import { SigninAsPharmacyComponent } from './signin-as-pharmacy/signin-as-pharmacy.component';
// import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component' 
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignupAsDeliveryComponent } from './signup-as-delivery/signup-as-delivery.component';
import { SigninAsDeliveryComponent } from './signin-as-delivery/signin-as-delivery.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SigninAsClientComponent,
    SignupAsClientComponent,
    SignupAsPharmacyComponent,
    SigninAsPharmacyComponent,
    // SigninComponent,
    SignupComponent,
    SignupAsDeliveryComponent,
    SigninAsDeliveryComponent,
  

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule, 
    RouterModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  exports:[
    SigninAsClientComponent,
    SignupAsClientComponent,
    SignupAsPharmacyComponent,
    SigninAsPharmacyComponent,
    // SigninComponent,
    SignupComponent
  ]
})
export class AuthModule { }
