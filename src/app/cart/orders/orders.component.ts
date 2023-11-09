import { Component } from '@angular/core';
import { ApiService } from '../servic/api.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  allOrders:Array<any> = [];
  totalLenght:any;
  page :number=1;
  isLoading: boolean = true;
  constructor(private apiService: ApiService){

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
