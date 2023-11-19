import { Component } from '@angular/core';
import {
  pharmacyProduct,
} from 'src/app/shared/services/medication.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { UrlService } from 'src/app/services/url.service';
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
  token:any;
  faPenSquare=faPenSquare;
  faFolderOpen=faFolderOpen;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private urlService: UrlService
    ) {}

  products !: pharmacyProduct[]; 

  ngOnInit() {
    // this.totalLenght=this.product.length;
    this.token = localStorage.getItem('token')
    this.id = this.activeRoute.snapshot.paramMap.get("id")
    this.getMedicationList();
    this.addProductUrl = `addProduct/${this.id}`
  }

  // get medication of pharamcy
  getMedicationList() {
    this.urlService.getPharmacyMedication(+this.id, this.token).subscribe(
      (res: any) => {
        this.products = res.data.medication;
      },
      error => this.router.navigate(['not-found'])
    );
  }

  // open alert to ensure delete product
  openAlert(val:any){
    this.deleteId = val
  }

  // function to delete product in list of products in pharamcy 
  deleteProduct() {
    this.urlService.deleteMedication(this.deleteId, this.token).subscribe(
      (res: any) => {
        const index = this.products.findIndex(product => product.pharmacyMedication_id === this.deleteId);
        this.products.splice(index, 1);
      },
      error => console.log(error)
    );
  }

  // go to add product page
  goToAddProduct(){
    this.router.navigate([this.addProductUrl])
  }
  
  
}
