import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewClientDataComponent } from './client/view-client-data/view-client-data.component';
import { EditClientDataComponent } from './client/edit-client-data/edit-client-data.component';
import { EditPharmacyDataComponent } from './pharmacy/edit-pharmacy-data/edit-pharmacy-data.component';
import { ViewPharmacyDataComponent } from './pharmacy/view-pharmacy-data/view-pharmacy-data.component';
import { EditDeliveryDataComponent } from './delivery/edit-delivery-data/edit-delivery-data.component';
import { ViewDeliveryDataComponent } from './delivery/view-delivery-data/view-delivery-data.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DeliveryOrdersComponent } from './delivery/delivery-orders/delivery-orders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeliveryOrderComponent } from './delivery/delivery-order/delivery-order.component';
import { SingleProductComponent } from './client/single-product/single-product.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ViewClientDataComponent,
    EditClientDataComponent,
    EditPharmacyDataComponent,
    ViewPharmacyDataComponent,
    EditDeliveryDataComponent,
    ViewDeliveryDataComponent,
    DeliveryOrdersComponent,
    DeliveryOrderComponent,
    SingleProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatButtonToggleModule,
    NgxPaginationModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class ProfileModule { }
