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
        productName: new FormControl('', [Validators.required]),
        productQuantity: new FormControl('',[Validators.required]),
        productPrice: new FormControl('',[Validators.required]),
        productExpire: new FormControl('',[Validators.required]),
        productCategory: new FormControl('',[Validators.required])
  
  
  
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
let product_name =this.updateProductForm.controls['productName'].value;
let product_quantity =this.updateProductForm.controls['productQuantity'].value;
let product_Price =this.updateProductForm.controls['productPrice'].value;
let product_Expire =this.updateProductForm.controls['productExpire'].value;
let product_Category =this.updateProductForm.controls['productCategory'].value;

let updatedProduct= {
id : this.activeRoute.snapshot.params['id'] ,
productName: product_name,
productQuantity: product_quantity,
productPrice: product_Price,
productExpire: product_Expire,
productCategory: product_Category,
};
localStorage.setItem("currentPharma", JSON.stringify(updatedProduct));
      // console.log(this.updatedProduct);
      this.productId = {...this.productId,...updatedProduct};
      console.log(this.productId,this.products);
}

}
