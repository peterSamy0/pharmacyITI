import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SearchComponent } from './components/search/search.component';
import { FilterByCatComponent } from './components/filter-by-cat/filter-by-cat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PharmacyDetailsComponent } from './components/pharmacy-details/pharmacy-details.component';
import { FeedBackComponent } from './components/feed-back/feed-back.component';
import { PharmacyListComponent } from './components/pharmacy-list/pharmacy-list.component';
import { PharmacyCardComponent } from './components/pharmacy-card/pharmacy-card.component';
import { CategoryComponent } from './components/category/category.component';
import { MedicationCardComponent } from './components/medication-card/medication-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { SearchPharmaciesPipe } from '../pipes/search-pharmacies.pipe';


@NgModule({
  declarations: [
    CarouselComponent,
    SearchComponent,
    FilterByCatComponent,
    PharmacyDetailsComponent,
    FeedBackComponent,
    PharmacyCardComponent,
    PharmacyListComponent,
    CategoryComponent,
    MedicationCardComponent,
    SearchPharmaciesPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    AppRoutingModule
  ],
  exports: [
    PharmacyListComponent,
    CategoryComponent,
    MedicationCardComponent

  ]
})
export class PharmacyDetailsModule { }
