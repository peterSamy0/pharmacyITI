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
  pharmacy:any;
  token:any;
  constructor(private routeUrl:ActivatedRoute,private http: HttpClient ){
    // get order id
    this.routeUrl.paramMap.subscribe(params => this.orderId = Number(params.get("id")));
    
  };
  ngOnInit() {
    // git order data from db
    this.token = localStorage.getItem('token')
    this.http.get(`http://localhost:8000/api/orders/${this.orderId}`,{
      headers:{
        Authorization:"Bearer " + localStorage.getItem('token') 
      }
    }).
    subscribe((data:any)=> {
      this.orderData = data.data;
      console.log(data.data)
      
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
    let updatedData = {
      "ordMedications": [
        { "key": removedId, "value": 0 }
      ]
    };
    try{
      // update request to remove item from order
      const headers = { 'Authorization': `Bearer ${this.token}`, 'Content-Type': 'application/json' };
      const options = { headers: headers };

      this.http.patch(`http://localhost:8000/api/orders/${this.orderId}`, updatedData, options).subscribe(data => {
        console.log(data)
      });
            // get request to refresh page
      this.http.get(`http://localhost:8000/api/orders/${this.orderId}`, options).
      subscribe(data=> {let x:any = data;
      this.orderData = x.data;
      console.log(this.orderData);});
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
  generateImageUrl(val:any) {
    return `http://localhost:8000/storage/${val}`;
  }

}
