import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../shared/services/service.service';
import { Pharmacy } from 'src/app/interface/pharmacy';
import { CarouselService } from '../../services/carousel.service';
@Component({
  selector: 'app-pharmacy-details',
  templateUrl: './pharmacy-details.component.html',
  styleUrls: ['./pharmacy-details.component.css']
})
export class PharmacyDetailsComponent {
  // pharmacyId:string|any;
  // pharmacy!:Pharmacy;
  // constructor(private routeUrl:ActivatedRoute, private fetchPharmacy:ServiceService){

  //   this.routeUrl.paramMap.subscribe(params => this.pharmacyId = params.get("id"));
  //   this.fetchPharmacy.getDataPharmacy()
  //   .subscribe(data=>
  //               {this.pharmacy =
  //                Object.values(data)[this.pharmacyId-1];
  //                console.log(this.pharmacy)
  //               });
  // }
  // ngOnInit(){
  // }
  constructor(private service: CarouselService,private activeRoute: ActivatedRoute) {}

  id!:number;
  pharmacy!:any;
  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id']
    // this.getAllProducts();    
    this.getPharma();
  }
  getPharma() {
    // this.isLoading = true;
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
