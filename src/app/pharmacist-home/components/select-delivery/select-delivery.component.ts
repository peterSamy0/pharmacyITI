import { Component } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { DeliveryResponse, DeliveryServiceService } from 'src/app/services/delivery-service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-select-delivery',
  templateUrl: './select-delivery.component.html',
  styleUrls: ['./select-delivery.component.css']
})
export class SelectDeliveryComponent {

  faCheck :any = faCheck;
  faXmark :any = faXmark;
  // Deliveries: any = [];
  // city: string | null = '';
  // constructor(private deliverService: ServiceService, private route: ActivatedRoute){}

  // ngOnInit(){
  //   this.getDeliveryData();
  //   this.city = this.route.snapshot.paramMap.get("region");
  //   console.log(this.city)
  // }

  // getDeliveryData() {
  //   this.deliverService.getDeliveryData().subscribe(
  //     (res) => {
  //       if (Array.isArray(res)) {
  //         this.Deliveries = res.filter((item) => item.region === this.city);
  //       } else {
  //         console.log('Invalid response format. Expected an array.');
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // select(id:any){
  //   (!val.isSelected || null) ? val.isSelected = true : val.isSelected = false
  // }
  select(id:any){
    this.http.patch(`http://localhost:8000/order/${this.orderId}`, {"setDelivery":true,"deliveryId":id}).
    subscribe(data=>{
      console.log(data);
    })
  }

  deliveries!: DeliveryResponse[];
  nearDeliveries!: DeliveryResponse[];
  city: string | null = '';
  orderId:any;

  constructor(private deliveryService : DeliveryServiceService ,private route: ActivatedRoute, private http:HttpClient){
    
    this.city = this.route.snapshot.paramMap.get("region");
    this.orderId = this.route.snapshot.paramMap.get("id");
    console.log(this.city)
  };
  ngOnInit(){
    this.getDeliveryLists();
  }

  getDeliveryLists(){
    this.deliveryService.getDelivery().subscribe((res:any) => {
      this.deliveries = res.data;
      console.log(this.deliveries);

      this.nearDeliveries = this.deliveries.filter( (el) => {
        return el.city == this.city});
      console.log(this.nearDeliveries);
    });
  }
  test(){
    console.log(this.nearDeliveries);

  }
}
