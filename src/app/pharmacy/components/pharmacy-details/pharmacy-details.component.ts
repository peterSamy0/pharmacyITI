import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../shared/services/service.service';
import { CartService } from 'src/app/cart/servic/cart.service';
import { Pharmacy } from 'src/app/interface/pharmacy';
import { CarouselService } from '../../services/carousel.service';
@Component({
  selector: 'app-pharmacy-details',
  templateUrl: './pharmacy-details.component.html',
  styleUrls: ['./pharmacy-details.component.css']
})
export class PharmacyDetailsComponent {
  pharmacyId:string|any;
  pharmacy!:any;
  id!:number;
  phone:any;
  constructor(
    private routeUrl:ActivatedRoute, 
    private fetchPharmacy:ServiceService, 
    private cartService:CartService, 
    private service: CarouselService,
    private activeRoute: ActivatedRoute
    ){}


  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id']
    this.cartService.pharmacyId = this.activeRoute.snapshot.params['id'];
    this.getPharma();
    this.getPHone();
  }
  getPharma() {
    this.service.getPharmaData(this.id).subscribe(
      (res:any) => {
        this.pharmacy = res.data;
        console.log(res)
        // this.cartService.pharmacyId = this.pharmacy.pharmacy_id;
      },
      (error) => {
        console.log(error)
      }
    );    
  }
  
getPHone() {
    if(this.pharmacy.pharmacy_phone[0] > 1){
      this.phone = this.pharmacy.pharmacy_phone[0]['phone']
      console.log('ok')
      return this.phone;
    }
    this.phone = 'not available now';
    console.log('no')
    return this.phone;
  }
}

