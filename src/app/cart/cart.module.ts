import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartpageComponent } from './cartpage/cartpage.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderComponent } from './order/order.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { DateTimeFormatPipe } from '../pipes/date-time-format.pipe';
@NgModule({
  declarations: [
    CartpageComponent,
    OrdersComponent,
    OrderComponent,
    DateTimeFormatPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }
