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
  constructor(
    private routeUrl:ActivatedRoute, 
    private fetchPharmacy:ServiceService, 
    private cartService:CartService, 
    private service: CarouselService,
    private activeRoute: ActivatedRoute
    ){}


  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id']
    this.cartService.pharmacyId = this.pharmacyId;   
    this.getPharma();
  }
  getPharma() {
    this.service.getPharmaData(this.id).subscribe(
      (res:any) => {
        this.pharmacy = res.data;
        console.log(this.pharmacy)
      },
      (error) => {
        console.log(error)
      }
    );    
  }
}

