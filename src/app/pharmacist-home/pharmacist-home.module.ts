import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { EditProductsComponent } from './components/edit-products/edit-products.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';



@NgModule({
  declarations: [
    ListProductsComponent,
    AddProductsComponent,
    EditProductsComponent,
    ViewOrdersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PharmacistHomeModule { }
