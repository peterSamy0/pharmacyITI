import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/services/service.service';

interface Pharmacy{
  id:number,
  image: String,
  address: String,
  pharmacyName: String,
  siteDelivery: String
}
@Component({
  selector: 'app-pharmacy-list',
  templateUrl: './pharmacy-list.component.html',
  styleUrls: ['./pharmacy-list.component.css']
})
export class PharmacyListComponent{
  pharmArr!:Array<Pharmacy>
  constructor(private fetchPharmacies:ServiceService){
    this.fetchPharmacies.getData().subscribe(data=>{this.pharmArr = Object.values(data);
      // console.log(this.pharmArr, typeof(this.pharmArr),this.pharmArr[1])
    });
    
  }
  

  }