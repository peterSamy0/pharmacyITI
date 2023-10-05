import { CarouselService } from './../../services/carousel.service';
import { Component } from '@angular/core';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input () pharmacyID!:number;
  products: any = [];
  categories: any = [];
  visibleItems = 5;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  activeIndices: { [Category: string]: number } = {};
  isLoading: boolean = true;
  allProduct :boolean = false;

  constructor(private service: CarouselService) {}

  ngOnInit() {
    this.getAllProducts();    
  }

  getAllProducts() {
    this.isLoading = true;
    this.service.getData().subscribe(
      (res) => {
        this.products = res;
        this.getCategories();
        this.initializeActiveIndices();
        this.isLoading = false;
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
  
  diplay(){
    this.allProduct = true;
  }
}