import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MedicationService, Product } from 'src/app/shared/services/medication.service';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
 
  
  product! : Product;
  productsAdded : Array<Product>=[];
  searchText='';
  errors : any =[];

  
constructor ( private medicationService: MedicationService){}

name!: string;
price!: number;
image!: string;
category!: string;

ngOnInit() {
  this.getMedicationList();
}

getMedicationList() {
this.medicationService.getMedication().subscribe((res: any) => {
    this.product = res.data;
    console.log(res.data);
    
  });

}

addMedication(){
  const inputData =  {
    name: this.product.name,
    price: this.product.price,
    image: this.product.image,
    category: this.product.category,
  };
  console.log(this.product.name);
  console.log(this.productsAdded);
  
  
  this.medicationService.addMedication(inputData).subscribe({
    next: (res: any) => {
      console.log(res, 'response');
    },

    error:(err:any)=>{
      this.errors = err.error.errors;
      console.log(err.error.errors);
      
    }
  });
  
}

addOneProduct(product:Product ,event:any){
  

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

