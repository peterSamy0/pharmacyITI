import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interface/order';
import { ServiceService } from '../../../shared/services/service.service';
import { UrlService } from 'src/app/services/url.service';

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
  pharmacyId = JSON.parse(localStorage.getItem("_id") || '');

  constructor(
    private routeUrl:ActivatedRoute, 
    private urlSevice: UrlService
    ){
    this.routeUrl.paramMap.subscribe(params => this.orderId = params.get("id"));
  }

  ngOnInit(){
    this.token = localStorage.getItem('token');
    this.clientID = localStorage.getItem('_id');
    this.getOrder();
    this.getPharmacyData();
  }

  // get orders of pharmacy
  getOrder(){
    this.urlSevice.getOrders(this.token).subscribe(
      (data:any)=>{
        let order = Object.values(data).find((ele:any)=>{
          return ele.id == this.orderId;
        })
        this.thisOrder = order;
    });
  }

  // get pharmacy data
  getPharmacyData(){
    this.urlSevice.getPharmacy(this.pharmacyId, this.token).subscribe(
      (data:any) => {
        let pharmacy:any = Object.values(data.data);
        this.city = pharmacy[11];
        console.log(pharmacy);
    });
  }

  // showing status
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
  generateImageUrl(val:any) {
    return `http://localhost:8000/storage/${val}`;
  }
}
