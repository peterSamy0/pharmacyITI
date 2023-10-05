import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pharmacy } from 'src/app/interface/pharmacy';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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
