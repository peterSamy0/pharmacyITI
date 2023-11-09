import { Component } from '@angular/core';
import {
  MedicationService,
  pharmacyProduct,
} from 'src/app/shared/services/medication.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(
    private medicationService: MedicationService, 
    private activeRoute: ActivatedRoute,
    private route: Router
    ) {}

  products !: pharmacyProduct[]; 

  ngOnInit() {
    // this.totalLenght=this.product.length;
    this.id = this.activeRoute.snapshot.paramMap.get("id")
    this.getMedicationList();
    this.addProductUrl = `addProduct/${this.id}`

  }

  getMedicationList() {
    this.medicationService.getPharmacyMedication(+this.id).subscribe(
      (res: any) => {
        this.products = res.data.medication;
        console.log(this.products)
      },
      error => console.log(error)
    );
  }

<<<<<<< HEAD
  openAlert(val:any){
    this.deleteId = val
  }
=======
delete(productId:number){
  this.deleteId = productId ; 
}
>>>>>>> e9d66f3e43f8d120d60b74f0624eb9cd420e4289
  deleteProduct() {
    this.medicationService.deleteMedication(this.deleteId).subscribe(
      (res: any) => {
        const index = this.products.findIndex(product => product.medicine_id === this.deleteId);
        if (index > -1) {
          this.products.splice(index, 1);
        }
        this.route.navigate([`listproduct/${this.id}`]);
      },
      error => console.log(error)
    );
  }
}
