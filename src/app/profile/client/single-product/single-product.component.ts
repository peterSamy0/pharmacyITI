import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent {
  productId:any;
  productDetails:any;
  constructor(private http:HttpClient, private activeRoute:ActivatedRoute){}
    
  ngOnInit(){
    // get product id
    this.activeRoute.paramMap.subscribe(params => this.productId = Number(params.get("Pid")));
    // get product data
    this.http.get(`http://localhost:8000/api/medications/${this.productId}`).subscribe(
      (data:any) => {this.productDetails = data.data
      console.log(data)}
    )
  
  }
}
