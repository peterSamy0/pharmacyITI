import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EditProductsComponent } from './components/edit-products/edit-products.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { ViewOneOrderComponent } from './components/view-one-order/view-one-order.component';


@NgModule({
  declarations: [
    ListProductsComponent,
    EditProductsComponent,
    ViewOrdersComponent,
    AddProductsComponent,
    ViewOneOrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PharmacistHomeModule { }