// import { PharmaDetailesComponent } from './shared/components/pharma-detailes/pharma-detailes.component';
// import { PharmaListComponent } from './shared/components/pharma-list/pharma-list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "home",
    component: HomepageComponent
  },
  {
    path: "signIn",
    component: SigninComponent
  },
  {
    path: "signUp",
    component: SignupComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingRoutingModule { }
