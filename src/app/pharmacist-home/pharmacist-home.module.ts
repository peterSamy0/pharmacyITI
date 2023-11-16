import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { ViewOneOrderComponent } from './components/view-one-order/view-one-order.component';
import { SearchPipe } from '../pipes/search.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { SelectDeliveryComponent } from './components/select-delivery/select-delivery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { AddMedicationComponent } from './components/add-medication/add-medication.component';
import { SharedModule } from '../shared/shared.module';
// import { CamelToRegularPipe } from '../pipes/camel-to-regular.pipe';

@NgModule({
  declarations: [
    ListProductsComponent,
    ViewOrdersComponent,
    AddProductsComponent,
    ViewOneOrderComponent,
    SearchPipe,
    ViewOrdersComponent,
    SelectDeliveryComponent,
    AddMedicationComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule,
    FontAwesomeModule,
    SharedModule
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
