import { Component } from '@angular/core';
import {
  MedicationService,
  pharmacyProduct,
} from 'src/app/shared/services/medication.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent {
  faDelete = faTrash;
  faAdd = faAdd;
  totalLenght:any;
  page :number=1;
  deleteId!:number;
  id:any;
  addProductUrl!: string;
  constructor(private medicationService: MedicationService, private activeRoute: ActivatedRoute) {}

  products !: pharmacyProduct[]; 

  ngOnInit() {
    // this.totalLenght=this.product.length;
    this.id = this.activeRoute.snapshot.paramMap.get("id")
    this.getMedicationList();
    this.addProductUrl = `addProduct/${this.id}`

  }

  getMedicationList() {
    this.medicationService.getPharmacyMedication(+this.id).subscribe((res: any) => {
      this.products = res.data.medication;
    });
  }

delete(productId:number){
  productId = this.deleteId
}
  deleteProduct() {
   const productId=this.deleteId;
      this.medicationService.deleteMedication(productId).subscribe((res:any)=>{
        
        console.log(productId);
      
      })
      console.log(productId);
  }
}
