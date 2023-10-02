import { CarouselService } from './../../services/carousel.service';
import { Component } from '@angular/core';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  products: any = [];
  categories: any = [];
  visibleItems = 5;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  activeIndices: { [Category: string]: number } = {};

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
      this.categories.push(this.products[i]['Category'])
    }
    this.categories = Array.from(new Set(this.categories)); // Convert set to array
    console.log(this.categories)
  }

  initializeActiveIndices() {
    for (let Category of this.categories) {
      this.activeIndices[Category] = 0;
    }
  }

  prev(Category: string) {
    this.activeIndices[Category] = Math.max(this.activeIndices[Category] - 1, 0);
  }

  next(Category: string) {
    const CategoryProducts = this.getCategoryProducts(Category);
    this.activeIndices[Category] = Math.min(this.activeIndices[Category] + 1, CategoryProducts.length - this.visibleItems);
  }

  getCategoryProducts(Category: string): any[] {
    return this.products.filter((prod: any) => prod.Category === Category);
  }

  getActiveIndex(Category: string): number {
    return this.activeIndices[Category];
  }
}