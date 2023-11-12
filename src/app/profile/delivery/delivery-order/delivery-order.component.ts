import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.css']
})
export class DeliveryOrderComponent {
  orderId:any;
  orderData:any;
  constructor(private routeUrl: ActivatedRoute, private http:HttpClient){
    this.routeUrl.paramMap.subscribe(params => this.orderId = Number(params.get("Oid")));

  }
  ngOnInit() {
    // git order data from db
    this.http.get(`http://localhost:8000/api/orders/${this.orderId}`).
    subscribe((data:any)=> {
      console.log(data.status);
      this.orderData = data.data;
      });
    
  };
  deliver(){
    console.log("hello");
    this.http.put(`localhost:8000/api/orders/${this.orderId}`, {"delivery":true, "accept":true}).subscribe(
      data=>console.log(data)
    );
  }
}
