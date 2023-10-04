import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarouselComponent } from './pharmacy/components/carousel/carousel.component';

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
  {
    path: "pharmacyDetails",
    component: CarouselComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingRoutingModule { }
