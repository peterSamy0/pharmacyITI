import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orderId!:number ;
  orderData!:any;
  constructor(private routeUrl:ActivatedRoute,private http: HttpClient ){
    // get order id
    this.routeUrl.paramMap.subscribe(params => this.orderId = Number(params.get("id")));
    
  };
  ngOnInit() {
    // git order data from db
    this.http.get(`http://localhost:8000/api/orders/${this.orderId}`).
    subscribe((data:any)=> {
      console.log(data.status);
      this.orderData = data.data;
      });
    
  };
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
  calcTotal() {
    if (this.orderData.orderMedications) {
      const totalPrice = this.orderData.orderMedications.reduce((accumulator:any, currentItem:any) => {
        // Calculate the total price for each item and add it to the accumulator
        return accumulator + currentItem.price * currentItem.amount;
      }, 0);
      
      return totalPrice;
    } else {
      console.error("orderData is undefined");
    }
  }
  removeFromOrder(removedId:any){
    console.log(removedId);
    let updatedData = {
      "ordMedications": [
        { "key": removedId, "value": 0 }
      ]
    };
    try{
      // update request to remove item from order
      this.http.patch(`http://localhost:8000/api/orders/${this.orderId}`, updatedData).subscribe(data => {
        console.log(data)
      });
            // get request to refresh page
      this.http.get(`http://localhost:8000/api/orders/${this.orderId}`).
    subscribe(data=> {let x:any = data;
      this.orderData = x.data;
      console.log(this.orderData);});
    }
    catch(error:any){
      console.log(error);
    }
  }

}
