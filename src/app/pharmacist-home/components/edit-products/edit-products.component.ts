import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import productData from '../../../../assets/json/pharmacyDetails.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent {
  constructor (private activeRoute : ActivatedRoute){
      this.updateProductForm = new FormGroup({
        
        productStock: new FormControl('',[Validators.required]),
        productPrice: new FormControl('',[Validators.required]),
  
  
  
      });

  }

  ngOnInit(){
    console.log(this.activeRoute.snapshot.params['id'])
    
  }
  products : Array<any>= productData;

  productId : any = productData[this.activeRoute.snapshot.params['id']-1];
  updateProductForm: FormGroup;


  
update(){
console.log(this.updateProductForm.value);
let product_Price =this.updateProductForm.controls['productPrice'].value;
let product_stock =this.updateProductForm.controls['productStock'].value;

let updatedProduct= {
id : this.activeRoute.snapshot.params['id'] ,
productName: this.productId.name,
productStock: product_stock,
productPrice: product_Price,
productCategory: this.productId.Category,
};
localStorage.setItem("currentPharma", JSON.stringify(updatedProduct));
      // console.log(this.updatedProduct);
      this.productId = {...this.productId,...updatedProduct};
      console.log(this.productId,this.products);
}

}
