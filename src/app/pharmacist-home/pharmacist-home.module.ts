import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { ViewOneOrderComponent } from './components/view-one-order/view-one-order.component';
import { SearchPipe } from '../pipes/search.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { SelectDeliveryComponent } from './components/select-delivery/select-delivery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  declarations: [
    ListProductsComponent,
    ViewOrdersComponent,
    AddProductsComponent,
    ViewOneOrderComponent,
    SearchPipe,
  
    ViewOrdersComponent,
    SelectDeliveryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    AddProductsComponent,
    ListProductsComponent,
    SelectDeliveryComponent,
    ViewOrdersComponent,
    ViewOneOrderComponent
  ]
})
export class PharmacistHomeModule { }
