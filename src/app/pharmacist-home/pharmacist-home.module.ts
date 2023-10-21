import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './components/list-products/list-products.component';
// import { AddProductsComponent } from './components/products/add-products/add-products.component';
import { EditProductsComponent } from './components/edit-products/edit-products.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { ProductCardComponent } from './components/product-card/product-card.component';



@NgModule({
  declarations: [
    ListProductsComponent,
    // AddProductsComponent,
    EditProductsComponent,
    ViewOrdersComponent,
    ProductCardComponent

  ],
  imports: [
    CommonModule
  ]
})
export class PharmacistHomeModule { }
