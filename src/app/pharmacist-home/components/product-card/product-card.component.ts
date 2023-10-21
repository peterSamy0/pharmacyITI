import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() deleteProductEvent = new EventEmitter<Product>();
  
  deleteProduct() {
    this.deleteProductEvent.emit(this.product);
  }
}
