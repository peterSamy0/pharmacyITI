import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EditProductsComponent } from './components/edit-products/edit-products.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { ViewOneOrderComponent } from './components/view-one-order/view-one-order.component';
import { SearchPipe } from '../pipes/search.pipe';


import { ProductCardComponent } from './components/product-card/product-card.component';
import { SelectDeliveryComponent } from './components/select-delivery/select-delivery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    ListProductsComponent,
    EditProductsComponent,
    ViewOrdersComponent,
    AddProductsComponent,
    ViewOneOrderComponent,
    SearchPipe,
    EditProductsComponent,
    ViewOrdersComponent,
    ProductCardComponent,
    SelectDeliveryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    FontAwesomeModule
  ]
})
export class PharmacistHomeModule { }
