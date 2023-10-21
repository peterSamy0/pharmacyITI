import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { EditProductsComponent } from './components/edit-products/edit-products.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { FormsModule } from '@angular/forms';
import { ViewOneOrderComponent } from './components/view-one-order/view-one-order.component';
import { ProductCardComponent } from './components/product-card/product-card.component';



@NgModule({
  declarations: [
    ListProductsComponent,
    EditProductsComponent,
    ViewOrdersComponent,
    AddProductsComponent,
    ViewOneOrderComponent,
    EditProductsComponent,
    ViewOrdersComponent,
    ProductCardComponent

  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PharmacistHomeModule { }
