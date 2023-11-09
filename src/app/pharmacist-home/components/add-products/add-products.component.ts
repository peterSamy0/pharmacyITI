import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  totalLenght:any;
  page :number=1;
  pharmacy_id!:number | null;
  medicineObj:any;
  medicationsList!: any;

constructor (
  private medicationService: MedicationService, 
  private activeRoute: ActivatedRoute,
  private route:Router
  ){}


ngOnInit() {
  this.pharmacy_id = Number(this.activeRoute.snapshot.paramMap.get('id'));
  this.getMedicationList();
  this.totalLenght=this.product;
}

getMedicationList() {
this.medicationService.getMedication().subscribe((res: any) => {
    this.product = res.data;
  });

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

addOneProduct(val:any ,event:any){
  if(event.target.checked==true){
    this.medicineObj = {
      "pharmacy_id": this.pharmacy_id,
      "medicine_id": val.id
    }
    this.productsAdded.push(this.medicineObj);
    this.medicationsList = {
      "medicationsList":this.productsAdded
    }
    console.log(this.medicationsList)
  }
  else{
    console.log('checkbox is unchecked');
      const index = this.productsAdded.indexOf(val);
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

