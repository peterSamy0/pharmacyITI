import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicationService, Product } from 'src/app/shared/services/medication.service';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
 
  
  product! : Product;
  productsAdded : any = [];
  searchText='';
  errors : any =[];
  name!: string;
  price!: number;
  image!: string;
  category!: string;
  id:any;

  
constructor (
  private medicationService: MedicationService, 
  private activeRoute: ActivatedRoute
  ){}


ngOnInit() {
  this.getMedicationList();
  this.id = this.activeRoute.snapshot.paramMap.get("id")
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

addOneProduct(id:any ,event:any){
  if(event.target.checked==true){
    let medicineObj = {
      "pharmacy_id": this.id,
      "medicine_id": id
    }
    this.productsAdded.push(medicineObj);
    console.log(this.productsAdded)
  }
  else{
    console.log('checkbox is unchecked');
      const index = this.productsAdded.indexOf(id);
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

