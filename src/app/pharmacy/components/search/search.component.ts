import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../../services/carousel.service';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  [x: string]: any;
  searchInput!: string;
  filteredItems!: any[];
  products: any = [];
  categories: any = [];
  result:any = [];
  id!:number;
  constructor(
    private service: CarouselService,
    private activeRoute: ActivatedRoute,
    private urlService: UrlService
    ) {}

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id']
    this.getAllProducts();    
  }

  getAllProducts() {
    this.urlService.getPharmacyData(this.id).subscribe(
      (res:any) => {
        this.products = res.medication;
        // console.log(this.products.data.medication)
        console.log(this.products);
        
      },
      (error) => {
        console.log(error)
      }
    );    
  }
  getValue(inputValue: string){
    this.service.inputValurOfSearch = inputValue;
    console.log("Input value:", inputValue);
    this.performSearch(inputValue) 
  }
  performSearch(val:any) {
    this.filteredItems = this.products.filter((item: any) => {
      return item.medicine_name.toLowerCase().includes(val.toLowerCase());
    });
    this.service.searchResult = this.filteredItems;
    this.service.isBtnClicked = true;
  }
}
