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
  city:string|any;
  token: any;
  clientID: any
  pharmacyId = localStorage.getItem("_id");

  constructor(private routeUrl:ActivatedRoute, private fetchOrders:ServiceService){
    this.routeUrl.paramMap.subscribe(params => this.orderId = params.get("id"));
    
    this.fetchOrders.getOrders()
    .subscribe((data:any)=>{
      let order = Object.values(data).find((ele:any)=>{
        return ele.id == this.orderId;
      })
      this.thisOrder = order;
      console.log(order);
    });
  }
  ngOnInit(){
    this.token = localStorage.getItem('token');
    this.clientID = localStorage.getItem('_id');
    this.fetchOrders.getPharmacy(this.pharmacyId)
    .subscribe(data=>{
        let pharmacy:any = Object.values(data);
        this.city = pharmacy[0].city;
        console.log(this.city);
    });
  }
  print(){
    console.log(this.orderId, this.thisOrder);
  }
  badgeColor(status:string) {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'accepted':
        return 'primary';
      case 'withDelivery':
        return 'danger';
      case 'delivered':
        return 'success';
      default:
        return 'black';
    }
  }
}
