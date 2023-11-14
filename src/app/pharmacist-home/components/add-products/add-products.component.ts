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
  token: any;
constructor (
  private medicationService: MedicationService, 
  private activeRoute: ActivatedRoute,
  private route:Router
  ){}



  ngOnInit() {
    this.pharmacy_id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.token = localStorage.getItem('token')
    this.fetchData();
  }
  
  fetchData() {
    this.token = localStorage.getItem('token')
    forkJoin([
      this.medicationService.getMedication(),
      this.medicationService.getPharmacyMedication(this.pharmacy_id, this.token)
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
    const index = this.productsAdded.findIndex((item:any) => item.medication_id === product.id);
    if (index >= 0) {
      this.productsAdded.splice(index, 1);
    }
    checkbox.checked = false;
  }
}

addOneProduct(val:any ,event:any, priceVal:any){
  if(event.target.checked==true){
    this.medicineObj = {
      "pharmacy_id": this.pharmacy_id,
      "medication_id": val.id,
      "price": priceVal
    }
    this.productsAdded.push(this.medicineObj);
    this.medicationsList = {
      "medicationsList":this.productsAdded
    }
  }
  else{
    console.log('checkbox is unchecked');
    const index = this.productsAdded.findIndex((item:any) => item.medication_id === val.id);
    if (index >= 0) {
      this.productsAdded.splice(index, 1);
    }
  };
  console.log(this.productsAdded)
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

