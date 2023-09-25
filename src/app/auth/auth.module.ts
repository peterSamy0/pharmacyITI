import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninAsClientComponent } from './signin-as-client/signin-as-client.component';
import { SignupAsClientComponent } from './signup-as-client/signup-as-client.component';
import { SignupAsPharmacyComponent } from './signup-as-pharmacy/signup-as-pharmacy.component';
import { SigninAsPharmacyComponent } from './signin-as-pharmacy/signin-as-pharmacy.component';



@NgModule({
  declarations: [
    SigninAsClientComponent,
    SignupAsClientComponent,
    SignupAsPharmacyComponent,
    SigninAsPharmacyComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SigninAsClientComponent,
    SignupAsClientComponent,
    SignupAsPharmacyComponent,
    SigninAsPharmacyComponent
  ]
})
export class AuthModule { }
