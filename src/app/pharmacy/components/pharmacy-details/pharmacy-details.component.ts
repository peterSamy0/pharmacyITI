import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../shared/services/service.service';
import { CartService } from 'src/app/cart/servic/cart.service';
import { Pharmacy } from 'src/app/interface/pharmacy';
import { CarouselService } from '../../services/carousel.service';
import { UrlService } from 'src/app/services/url.service';
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
    private cartService:CartService, 
    private activeRoute: ActivatedRoute,
    private urlService: UrlService
  ){}

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id']
    this.cartService.pharmacyId = this.activeRoute.snapshot.params['id'];
    this.getPharma();
  }

  // function to get pharamcy information
  getPharma() {
    this.urlService.getPharmacyData(this.id).subscribe(
      (res:any) => {
        this.pharmacy = res;
        this.getPhone(res)
      },
      (error) => {
        console.log(error)
      }
    );    
  }

  // function to get phone number of the pharamcy if it exists or if it does not exists show not available
  getPhone(val:any){
    if(val.pharmacy_phone > 0){
      this.phone = val.pharmacy_phone[0]['phone']
    }
    this.phone = 'Not Available Now'
  }
}

