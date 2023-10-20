import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import products from  '../../../../assets/json/pharmacyDetails.json';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  productData : Array<any>= products;
  selectedProduct: any;
  user : Array<any> = [
    {
      name:"ahmed",
      age:34
    },{
      name:"mona",
      age:30
    }
  ];

  product : any = {
    isActive: true,
    name: "name"
  };
  isAdmin:boolean=true;
  name :String ="hello";
  // addProduct: FormGroup;
  constructor() {
    // this.addProduct = new FormGroup({
    //   pharmaEmail: new FormControl('', [Validators.required]),
    //   pharmaPass: new FormControl('',[Validators.required])
    // });
    console.log(this.productData);
}

}
