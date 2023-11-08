import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicationService, Product } from 'src/app/shared/services/medication.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css'],
})
export class EditProductsComponent implements OnInit {
  product!: Product;
  productId!: any;
  errors: any = [];
  // category!:Product;

  constructor(
    private route: ActivatedRoute,
    private medicationService: MedicationService
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    // console.log(this.productId);
    this.medicationService
      .getMedicationToEdit(this.productId)
      .subscribe((result:any)  => {
        this.product = result.data;
        console.log(result.data);
      });
    
  }

  update() {
    const inputData = {
      // name: this.product.name,
      // price: this.product.price,
      // image: this.product.image,
      // category: this.product.category,
    };
// console.log(inputData);

    this.medicationService
      .update(inputData, this.productId)
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err: any) => {
          this.errors = err.error.errors;
        },
      });
  }

}
