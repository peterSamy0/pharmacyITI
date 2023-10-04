import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SearchComponent } from './components/search/search.component';
import { FilterByCatComponent } from './components/filter-by-cat/filter-by-cat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PharmacyDetailsComponent } from './components/pharmacy-details/pharmacy-details.component';
import { FeedBackComponent } from './components/feed-back/feed-back.component';


@NgModule({
  declarations: [
    CarouselComponent,
    SearchComponent,
    FilterByCatComponent,
    PharmacyDetailsComponent,
    FeedBackComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class PharmacyDetailsModule { }
