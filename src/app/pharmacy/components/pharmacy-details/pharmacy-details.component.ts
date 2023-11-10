import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../shared/services/service.service';
import { CartService } from 'src/app/cart/servic/cart.service';
import { Pharmacy } from 'src/app/interface/pharmacy';
@Component({
  selector: 'app-pharmacy-details',
  templateUrl: './pharmacy-details.component.html',
  styleUrls: ['./pharmacy-details.component.css']
})
export class PharmacyDetailsComponent {
  pharmacyId:string|any;
  pharmacy!:Pharmacy;
  constructor(private routeUrl:ActivatedRoute, private fetchPharmacy:ServiceService, private cartService:CartService){

    this.routeUrl.paramMap.subscribe(params => this.pharmacyId = params.get("id"));
    this.fetchPharmacy.getDataPharmacy()
    .subscribe(data=>
                {this.pharmacy =
                 Object.values(data)[this.pharmacyId-1];
                 console.log(this.pharmacy)
                });
  }
  ngOnInit(){
    this.cartService.pharmacyId = this.pharmacyId;
  }
  
  

}
