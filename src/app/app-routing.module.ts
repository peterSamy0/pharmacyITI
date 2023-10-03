
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninAsClientComponent } from './auth/signin-as-client/signin-as-client.component';
import { SigninAsPharmacyComponent } from './auth/signin-as-pharmacy/signin-as-pharmacy.component';
import { SignupAsClientComponent } from './auth/signup-as-client/signup-as-client.component';
import { SignupAsPharmacyComponent } from './auth/signup-as-pharmacy/signup-as-pharmacy.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SearchInsidePharmacyComponent } from './search-inside-pharmacy/search-inside-pharmacy.component';

const routes: Routes = [

  {
    path:'',
    component: HomepageComponent
  },
  {
    path:'home-page',
    component: HomepageComponent
  },
  {
    path:'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path:'signin-client',
    component:SigninAsClientComponent
  },
  {
    path:'signin-pharmacy',
    component:SigninAsPharmacyComponent
  },
  {
    path:'signup-client',
    component: SignupAsClientComponent
  },
  {
    path:'signup-pharmacy',
    component:SignupAsPharmacyComponent
  },

  {
    path :'search/:query',
    component : SearchInsidePharmacyComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
