
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicationService, Product } from 'src/app/shared/services/medication.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent {
  product!: Product;
  productId: any;
  errors: any = [];
  price! :number;
  token:any;
  productPrice!: number;
constructor(
  private activeroute: ActivatedRoute, 
  private medicationService: MedicationService,
  private router: Router
  ) {}

  ngOnInit() {
    this.productId = this.activeroute.snapshot.paramMap.get('id');
    this.token = localStorage.getItem('token')
    this.medicationService.getMedicine(this.productId, this.token).subscribe((res:any) => {
      this.product = res;
      this.productPrice = res.price
    });
  }

  getform(){
    
  }

  updatePrice(event: Event, val:any) {
    event.preventDefault();
    this.productPrice = parseFloat(val);

    const inputData = {
      price: this.product.price,
    };
    const data = {
      "price": this.productPrice
    }

    this.medicationService.updatePrice(this.product.pharmacyMedicationID, data, this.token).subscribe({
      next: (res: any)=> {
        this.router.navigate([`listproduct/${this.product.pharmacyID}`])
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
