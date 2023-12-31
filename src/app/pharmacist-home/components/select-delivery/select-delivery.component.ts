import { Component } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { DeliveryResponse, DeliveryServiceService } from 'src/app/services/delivery-service.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-select-delivery',
  templateUrl: './select-delivery.component.html',
  styleUrls: ['./select-delivery.component.css']
})
export class SelectDeliveryComponent {

  faCheck :any = faCheck;
  faXmark :any = faXmark;
  isSelected:boolean = false;

  select(id: any) {
    this.isSelected = true;
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    };
  
    this.http.patch(`http://localhost:8000/api/orders/${this.orderId}`, {
      setDelivery: true,
      deliveryId: id
    }, { headers: headers })
    .subscribe(data => {
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: `order has been assigned to delivery`,
        text: 'success',
      })
    });
  }

  deliveries!: DeliveryResponse[];
  nearDeliveries!: DeliveryResponse[];
  city: string | null = '';
  orderId:any;

  constructor(
    private deliveryService : DeliveryServiceService ,
    private route: ActivatedRoute, 
    private http:HttpClient
    ){
    
    this.city = this.route.snapshot.paramMap.get("region");
    this.orderId = this.route.snapshot.paramMap.get("id");
  };
  ngOnInit(){
    this.getDeliveryLists();
  }

  getDeliveryLists(){
    this.deliveryService.getDelivery().subscribe((res:any) => {
      this.deliveries = res.data;
      this.nearDeliveries = this.deliveries.filter( (el) => {
        return el.city == this.city});
    });
  }

}
