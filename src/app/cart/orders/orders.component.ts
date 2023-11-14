import { Component } from '@angular/core';
import { ApiService } from '../servic/api.service';
import { HttpClient } from '@angular/common/http';
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
  token: any;
  clientID: any;
  constructor(private apiService: ApiService, private http :HttpClient){

  }
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.clientID = localStorage.getItem('_id');
    this.apiService.allClientOrders(this.clientID, this.token).subscribe(
      (res:any)=>{
            this.allOrders= res.data.orders;
            this.isLoading = false;
            console.log(this.allOrders)
            console.log(res)
    });
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
  removeOrder(orderId:any){
    try{
      // update request to remove item from order
      this.http.delete(`http://localhost:8000/api/orders/${orderId}`,{
        headers:{
          Authorization:"Bearer " + localStorage.getItem('token') 
        }
      }).subscribe(
        (res: any) => {
          const index = this.allOrders.findIndex(product => product.id === orderId);
          this.allOrders.splice(index, 1);
        },
        error => console.log(error)
      );
    }
    catch(error:any){
      console.log(error);
    }
  }
  delivered(orderId:any) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    };
  
    this.http.patch(`http://localhost:8000/api/orders/${orderId}`, {'delivered':true}, { headers: headers })
      .subscribe(data => {
        console.log(data);
      });
  }
}
