import { Component } from '@angular/core';
import { ApiService } from 'src/app/cart/servic/api.service';
import { HttpClient } from '@angular/common/http';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-delivery-orders',
  templateUrl: './delivery-orders.component.html',
  styleUrls: ['./delivery-orders.component.css']
})
export class DeliveryOrdersComponent {
  
  allOrders:Array<any> = [];
  totalLenght:any;
  page :number=1;
  isLoading: boolean = true;
  faCircle=faCircle;
  deliveryId!:number;

  constructor(private apiService: ApiService, private http :HttpClient){
    this.deliveryId = Number(localStorage.getItem('_id'));

  }
  ngOnInit() {
    this.apiService.allOrders().subscribe(data=>{
      this.allOrders=Object.values(data);
      this.isLoading = false;});
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
