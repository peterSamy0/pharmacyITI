import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interface/order';
import { ServiceService } from '../../../shared/services/service.service';

@Component({
  selector: 'app-view-one-order',
  templateUrl: './view-one-order.component.html',
  styleUrls: ['./view-one-order.component.css']
})
export class ViewOneOrderComponent {
  thisOrder!:Order|any;
  orderId:number|any;
;
  constructor(private routeUrl:ActivatedRoute, private fetchOrders:ServiceService){
    this.routeUrl.paramMap.subscribe(params => this.orderId = params.get("id"));
    this.fetchOrders.getOrders()
    .subscribe(data=>
                {this.thisOrder =
                 Object.values(data)[this.orderId-1];
                });
  }
  print(){
    console.log(this.orderId, this.thisOrder);
  }
}
