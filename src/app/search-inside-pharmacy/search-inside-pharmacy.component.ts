import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../shared/services/service.service';
import { Pharmacy } from '../interface/pharmacy';

@Component({
  selector: 'app-search-inside-pharmacy',
  templateUrl: './search-inside-pharmacy.component.html',
  styleUrls: ['./search-inside-pharmacy.component.css']
})
export class SearchInsidePharmacyComponent implements OnInit {

  searchResult : undefined | Pharmacy[]; 

  constructor( private activeRoute : ActivatedRoute , private product : ServiceService ){}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.log(query)

    query && this.product.searchProduct(query).subscribe((result)=>{
     this.searchResult = result;
  
    }) 
  }

  
}
