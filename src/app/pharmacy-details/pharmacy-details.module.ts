import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SearchComponent } from './components/search/search.component';
import { FilterByCatComponent } from './components/filter-by-cat/filter-by-cat.component';



@NgModule({
  declarations: [
    CarouselComponent,
    SearchComponent,
    FilterByCatComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PharmacyDetailsModule { }
