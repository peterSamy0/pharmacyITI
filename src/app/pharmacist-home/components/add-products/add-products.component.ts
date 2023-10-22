import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import products from  '../../../../assets/json/pharmacyDetails.json';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  pharmacyProducts: Array<any>=[];
  productData : Array<any>= products;
  selectedProduct: any;
  id : number = 1;
  addProductForm: FormGroup;
  constructor() {
    this.addProductForm = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      productQuantity: new FormControl('',[Validators.required]),
      productPrice: new FormControl('',[Validators.required]),
      productExpire: new FormControl('',[Validators.required]),
      productCategory: new FormControl('',[Validators.required])



    });
    console.log(this.productData);
}

add(){
console.log(this.addProductForm.value);
let product_name =this.addProductForm.controls['productName'].value;
let product_quantity =this.addProductForm.controls['productQuantity'].value;
let product_Price =this.addProductForm.controls['productPrice'].value;
let product_Expire =this.addProductForm.controls['productExpire'].value;
let product_Category =this.addProductForm.controls['productCategory'].value;

let newProduct= {
  id : this.id ++ ,
  productName: product_name,
  productQuantity: product_quantity,
  productPrice: product_Price,
  productExpire: product_Expire,
  productCategory: product_Category,
};
localStorage.setItem("currentPharma", JSON.stringify(newProduct));
this.pharmacyProducts.push(newProduct);
        console.log(this.pharmacyProducts);

}


}
