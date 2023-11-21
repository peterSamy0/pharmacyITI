import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.css']
})

export class DeliveryOrderComponent {
  orderId:any;
  orderData:any;
  faCircle=faCircle;
  constructor(private routeUrl: ActivatedRoute, private http:HttpClient,private router:Router){
    this.routeUrl.paramMap.subscribe(params => this.orderId = Number(params.get("Oid")));
  }

  ngOnInit() {
    // git order data from db
    this.http.get(`http://localhost:8000/api/orders/${this.orderId}`,{
      headers:{
        Authorization:"Bearer " + localStorage.getItem('token') 
      }
    }).
    subscribe((data:any)=> {
      console.log(data.status);
      this.orderData = data.data;
      });
    
  };
  deliver() {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    };
  
    this.http.patch(`http://localhost:8000/api/orders/${this.orderId}`, {}, { headers: headers })
      .subscribe(data => {
        console.log(data);
        Swal.fire("order accepted, the client is waiting!").
        then(_=>this.router.navigate(['/home']));
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
}
// 