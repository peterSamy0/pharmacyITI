import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../../services/carousel.service';

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
  constructor(private service: CarouselService) {}

  ngOnInit() {
    this.getAllProducts();    
  }

  getAllProducts() {
    this.service.getData().subscribe(
      (res) => {
        this.products = res;
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
      return item.name.toLowerCase().includes(val.toLowerCase());
    });
    this.service.searchResult = this.filteredItems;
    this.service.isBtnClicked = true;
  }
}
