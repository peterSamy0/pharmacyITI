import { Component } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { RouterModule } from '@angular/router';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent {

  faCircle=faCircle;
  orders: any = [];
  totalLenght:any;
  page :number=1;
  faEye = faEye;
  constructor(private orderService: ServiceService) {}
  isLoading: boolean = true;
  ngOnInit(){
    this.getData();
    this.totalLenght=this.orders.length;
  }

  getData() {
    this.isLoading = true;
    this.orderService.getOrders().subscribe(
      (res) => {
        this.orders = res;
        this.isLoading = false;
        this.orders = Array(...this.orders);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
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
