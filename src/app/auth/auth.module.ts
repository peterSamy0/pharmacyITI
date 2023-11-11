import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninAsClientComponent } from './signin-as-client/signin-as-client.component';
import { SignupAsClientComponent } from './signup-as-client/signup-as-client.component';
import { SignupAsPharmacyComponent } from './signup-as-pharmacy/signup-as-pharmacy.component';
import { SigninAsPharmacyComponent } from './signin-as-pharmacy/signin-as-pharmacy.component';
// import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component' 
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignupAsDeliveryComponent } from './signup-as-delivery/signup-as-delivery.component';
import { SigninAsDeliveryComponent } from './signin-as-delivery/signin-as-delivery.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
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
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    HttpClientModule,
    MatInputModule
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
