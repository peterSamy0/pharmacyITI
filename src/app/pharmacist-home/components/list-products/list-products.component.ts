import { Component } from '@angular/core';
import {
  MedicationService,
  Product,
} from 'src/app/shared/services/medication.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

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
 
  constructor(private medicationService: MedicationService) {}

  product !: Product[]; 

  ngOnInit() {
    this.getMedicationList();
    this.totalLenght=this.product.length;
    
  }

  getMedicationList() {
    this.medicationService.getMedication().subscribe((res: any) => {
      this.product = res.data;
      console.log(res.data);
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
