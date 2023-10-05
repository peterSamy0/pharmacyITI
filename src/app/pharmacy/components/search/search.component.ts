import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult : undefined | Product[]; 

  constructor( private activeRoute : ActivatedRoute , private product : ServiceService ){}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.log(query)

    query && this.product.searchProduct(query).subscribe((result)=>{
     this.searchResult = result;
    console.log(result)
    }) 
  }
}
