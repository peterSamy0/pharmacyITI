import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/cart/servic/cart.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent {
  productId:any;
  productDetails:any;
  constructor(private http:HttpClient, private activeRoute:ActivatedRoute,private service: CartService,){}
    
  ngOnInit(){
    // get product id
    this.activeRoute.paramMap.subscribe(params => this.productId = Number(params.get("Pid")));
    // get product data
    this.http.get(`http://localhost:8000/api/medications/${this.productId}`).subscribe(
      (data:any) => {this.productDetails = data.data
      console.log(data)}
    )
  
  }
  addToCart(val:any){
    this.service.addItemToCart(val);
    val.added = true;
    
  }
  removeFromCart(val:any){
  this.service.removeItemFromCart(val.id);
  val.added = false;
  console.log(val)
  }
}
