import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  // @Input() product: Product = {
  //   id: 0,
  //   title: '',
  //   description: '',
  //   price: 0,
  //   discountPercentage: 0,
  //   rating: 0,
  //   stock: 0,
  //   brand: '',
  //   category: '',
  //   thumbnail: '',
  //   images: [],
  //   createdDate: ''
  // };

  // constructor(private cartService: CartService) {}

  // addToCart(product: Product) {
  //   this.cartService.addItemToCart({
  //     id: product.id,
  //     name: product.title,
  //     price: product.price,
  //     quantity: 1,
  //     thumbnail: product.thumbnail
  //   });
  // }
}
