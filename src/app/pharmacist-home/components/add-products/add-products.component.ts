import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import products from  '../../../../assets/json/pharmacyDetails.json';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  productData : Array<any>= products;  
  productsAdded : Array<any>=[];
  searchText='';


addOneProduct(product:any ,event:any){
  
  if(event.target.checked==true){
    this.productsAdded.push(product);
       console.log(this.productsAdded);
    console.log('checkbox is checked',product.name ,"is added");

  }
  else{
    console.log('checkbox is unchecked');
      const index = this.productsAdded.indexOf(product);
      if (index >= 0) {
        this.productsAdded.splice(index, 1);
      }
      console.log(this.productsAdded);
  };
}

addSelected(){
  console.log(this.productsAdded);
  
}
  @ViewChildren("checkboxes")
  checkboxes!: QueryList<ElementRef>;

reset(){
  this.productsAdded=[];
  this.checkboxes.forEach((element) => {
    element.nativeElement.checked = false;
  });
  console.log(this.productsAdded);
}

 

}
