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
  pharmacyId:any;
  medication:any;
  cartArr:any = [];
  incompleteOrder:boolean = false;
  constructor(private http:HttpClient, private activeRoute:ActivatedRoute,private service: CartService,){}
    
  ngOnInit(){
    // get product id
    this.activeRoute.paramMap.subscribe(params => this.productId = Number(params.get("Pid")));
    // get pharmacy Id
    this.activeRoute.paramMap.subscribe(params => {this.pharmacyId = Number(params.get("id"))
    console.log()});

    

    // get data from cart
    this.cartArr = this.service.cartItems;
    console.log(this.cartArr);

    // get the item here if present in localStorage
    if(this.cartArr.length > 0){
      let producatFound = this.cartArr.find((item:any) => item.id == this.productId)
      if(producatFound){
        console.log("found", producatFound)
        this.productDetails = producatFound
        // console.log(this.cartArr,producatFound);
      }
      else{
        console.log("not found")
        // get product data
        this.http.get(`http://localhost:8000/api/pharmacies/${this.pharmacyId}`).subscribe(
          (data:any) => {this.productDetails = data.medication.find((ele:any)=>{return ele.id==this.productId})
          console.log(this.productDetails)
        console.log(data)

        }
    )
      }
    }else{
      console.log("not found")
      // get product data
      this.http.get(`http://localhost:8000/api/pharmacies/${this.pharmacyId}`).subscribe(
        (data:any) => {this.productDetails = data.medication.find((ele:any)=>{return ele.id==this.productId})
        console.log(this.productDetails)
        console.log(data)
      }
  )
    }

  
  }
  addToCart(val:any){
    if(this.service.pharmacyId && this.service.pharmacyId !== this.pharmacyId ){
      this.incompleteOrder = true;
    }else{

    val.added = true;
    this.service.addItemToCart(val);
    }
    
  }
  removeFromCart(val:any){
  this.service.removeItemFromCart(val.id);
  val.added = false;
  console.log(val)
  }
  // test(){
  //   console.log(this.service.pharmacyId)
  // };
}
