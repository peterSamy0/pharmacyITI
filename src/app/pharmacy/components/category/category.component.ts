import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medication } from 'src/app/interface/medication';
import { CarouselService } from '../../services/carousel.service';
import { CartService } from 'src/app/cart/servic/cart.service';
import { HttpClient } from '@angular/common/http';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UrlService } from 'src/app/services/url.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  id: number = 0;
  result: any;
  medicationCategory:string|any;
  allMedications!:Array<Medication>;
  medications!:Array<Medication>;
  isLoading: boolean = true;
  products: any;
  pharmacy!:any;
  phone:any;
  searchText='';
  faSearch = faSearch;
  
  constructor(
    private routeUrl:ActivatedRoute, 
    private service: CarouselService,
    private urlService: UrlService

    ){
    this.routeUrl.paramMap.subscribe(params => this.medicationCategory = params.get("cat"));
    this.medicationCategory = this.routeUrl.snapshot.paramMap.get('cat')
    
    const medications = sessionStorage.getItem('medications') || '[]';
    this.allMedications = JSON.parse(medications)

    const id = sessionStorage.getItem('pharamcyID') || '';
    this.id = JSON.parse(id)
  }
  
ngOnInit() {
  this.performSearch();
  this.getPharma();
}

performSearch() {
  this.result = this.allMedications.filter((item: any) => {
    return item.medicine_category == this.medicationCategory;
  });
  this.medications = this.result
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
  this.phone = 'not available now';
  console.log('no')
  return this.phone;
}
}
