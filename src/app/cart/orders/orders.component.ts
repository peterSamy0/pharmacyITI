import { Component } from '@angular/core';
import { ApiService } from '../servic/api.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  allOrders:Array<any> = [];
  constructor(private apiService: ApiService){

  }
  ngOnInit() {
    this.apiService.allOrders().subscribe(data=>{
      this.allOrders=Object.values(data)});
  }
  textColor(status:string) {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'accepted':
        return 'blue';
      case 'withDelivery':
        return 'green';
      case 'delivered':
        return 'black';
      default:
        return 'black';
    }
  }
}
