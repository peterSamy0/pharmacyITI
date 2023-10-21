import { Component } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {


  product  : any;
  
  constructor(private productService: ServiceService) {}
  ngOnInit() {  
    this.productService.getProductList().subscribe(
   (data) => (this.product = data),
      (error) => console.log(error),
      () => console.log('complete')
    );
  }

  deleteProduct(product: Product) {
    const index = this.product.indexOf(product);
    if (index !== -1) {
      this.product.splice(index, 1);
    }
  }
 
}
