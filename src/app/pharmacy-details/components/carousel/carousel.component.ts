import { CarouselService } from './../../services/carousel.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  products: any = [];
  categories: any = [];
  visibleItems = 4;
  activeIndices: { [category: string]: number } = {};

  constructor(private service: CarouselService) {}

  ngOnInit() {
    this.getAllProducts();    
  }

  getAllProducts() {
    this.service.getData().subscribe(
      (res) => {
        this.products = res;
        console.log(this.products[0]);
        this.getCategories();
        this.initializeActiveIndices();
      },
      (error) => {
        console.log(error)
      }
    );    
  }

  getCategories(){
    for(let i in this.products){
      this.categories.push(this.products[i]['category'])
    }
    this.categories = Array.from(new Set(this.categories)); // Convert set to array
    console.log(this.categories)
  }

  initializeActiveIndices() {
    for (let category of this.categories) {
      this.activeIndices[category] = 0;
    }
  }

  prev(category: string) {
    this.activeIndices[category] = Math.max(this.activeIndices[category] - 1, 0);
  }

  next(category: string) {
    const categoryProducts = this.getCategoryProducts(category);
    this.activeIndices[category] = Math.min(this.activeIndices[category] + 1, categoryProducts.length - this.visibleItems);
  }

  getCategoryProducts(category: string): any[] {
    return this.products.filter((prod: any) => prod.category === category);
  }

  getActiveIndex(category: string): number {
    return this.activeIndices[category];
  }
}