import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicationService, Product } from 'src/app/shared/services/medication.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})


export class AddProductsComponent implements OnInit {
 
  
  product! : Product[];
  productsAdded : any = [];
  searchText='';
  errors : any =[];
  totalLenght:any;
  page :number=1;
  pharmacy_id!:number | null;
  medicineObj:any;
  medicationsList!: any;
  products: any;
  isExists:boolean = false;

constructor (
  private medicationService: MedicationService, 
  private activeRoute: ActivatedRoute,
  private route:Router
  ){}



  ngOnInit() {
    this.pharmacy_id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.fetchData();
  }
  
  fetchData() {
    forkJoin([
      this.medicationService.getMedication(),
      this.medicationService.getPharmacyMedication(this.pharmacy_id)
    ]).subscribe(
      ([medicationRes, pharmacyMedicationRes] : any) => {
        this.product = medicationRes.data;
        this.products = pharmacyMedicationRes.data.medication;
        this.checkProduct();
      },
      error => console.log(error)
    );
  }
  
  checkProduct() {
    if (this.product && this.products) {
      this.product = this.product.filter(
        obj1 => this.products.every((obj2: any) => obj2.id !== obj1.id)
      );
      this.totalLenght = this.product.length;
    } else {
      console.log('this.product or this.products is not defined or is null');
    }
  }

addMedication(){
  this.medicationService.addMedication(this.medicationsList).subscribe({
    next: (res: any) => {
      this.route.navigate([`listproduct/${this.pharmacy_id}`])
    },

    error:(err:any)=>{
      this.errors = err.error.errors;
      console.log(err.error.errors);
      
    }
  });
}

handlePriceChange(product: any, checkbox: HTMLInputElement) {
  // Check if the checkbox is already checked
  if (checkbox.checked) {
    // Uncheck the checkbox
    checkbox.checked = false;
    // Perform any additional logic as needed
    console.log('Checkbox unchecked due to price modification');
  }
}

addOneProduct(val:any ,event:any, priceVal:any){
  if(event.target.checked==true){
    this.medicineObj = {
      "pharmacy_id": this.pharmacy_id,
      "medication_id": val.id,
      "price": priceVal
    }
    // this.isExists = this.products.filter( (item:any) => {
    //   return item.id == val
    // })
    // if(this.isExists){
    //   console.log('item already exsits')
    // }else{
      this.productsAdded.push(this.medicineObj);
      this.medicationsList = {
        "medicationsList":this.productsAdded
      // }
    }
  }
  else{
    console.log('checkbox is unchecked');
      const index = this.productsAdded.indexOf(val);
      if (index >= 0) {
        this.productsAdded.splice(index, 1);
      }
  };
}


  @ViewChildren("checkboxes")
  checkboxes!: QueryList<ElementRef>;

reset(){
  this.productsAdded=[];
  this.checkboxes.forEach((element) => {
    element.nativeElement.checked = false;
  });
}


}

