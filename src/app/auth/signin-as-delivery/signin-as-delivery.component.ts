import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  DeliveryResponse,
  DeliveryServiceService,
} from 'src/app/services/delivery-service.service';

@Component({
  selector: 'app-signin-as-delivery',
  templateUrl: './signin-as-delivery.component.html',
  styleUrls: ['./signin-as-delivery.component.css'],
})
export class SigninAsDeliveryComponent {
  deliveries!: DeliveryResponse[];
  deliveryNotFound = false;
  
  signinForm: FormGroup;
  constructor(
    private router: Router,
    private deliveryService: DeliveryServiceService
  ) {
    this.signinForm = new FormGroup({
      deliveryEmail: new FormControl('', [Validators.required]),
      deliveryPass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getDeliveryLists();
  }
  getDeliveryLists() {
    this.deliveryService.getDelivery().subscribe((res: any) => {
      console.log(res.data);
      this.deliveries = res.data;
      console.log(this.deliveries);
    });
  }

  checkDelivery() {
    console.log(this.signinForm);
    let deliveryEmail = this.signinForm.controls['deliveryEmail'].value;
    let deliveryPass = this.signinForm.controls['deliveryPass'].value;

    for (var i = 0; i < this.deliveries.length; i++) {
      if (
        deliveryEmail === this.deliveries[i].email &&
        deliveryPass == this.deliveries[i].password
      ) {
        console.log('correct');

        localStorage.setItem(
          'currentDelivery',
          JSON.stringify(this.deliveries[i])
        );
        this.deliveryNotFound =false;

        return;
      }else if(deliveryEmail !== this.deliveries[i].email &&
        deliveryPass !== this.deliveries[i].password){
        this.deliveryNotFound =true;
      }
    }
  }
}
