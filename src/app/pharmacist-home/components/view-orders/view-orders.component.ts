import { Component } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent {

  orders: any = [];
  constructor(private orderService: ServiceService) {}
  isLoading: boolean = true;
  ngOnInit(){
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.orderService.getOrders().subscribe(
      (res) => {
        this.orders = res;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
