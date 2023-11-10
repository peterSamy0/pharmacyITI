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

  openAlert(val:any){
    this.deleteId = val
    console.log(val)
  }
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
