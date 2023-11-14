import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicationService } from 'src/app/shared/services/medication.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.css'],
})
export class AddMedicationComponent {
 
  name!: string;
  namefail =false;
  price!: number;
  pricefail= false;
  image!: string;
  imagefail = false;
  category_id!: number;
  category_idfail = false;
  category!:string;
  categoryfail = false;
  errors: any = [];
  categories: any[] = []
  addMedicationForm!: FormGroup;
  selectedimage !: File;
  imageFile:any;
  token: any;
  pharmacyID!:any;

constructor(
  private medicationService: MedicationService,
  private http: HttpClient,
  private router: Router
  ) {
  this.addMedicationForm = new FormGroup({
    medicineName: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    category: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });
}
  ngOnInit() {
    this.getCategories();
    this.token = localStorage.getItem('token');
    this.pharmacyID = localStorage.getItem('_id');
  }
 
  
  onFileSelected(event:any){
    this.imageFile = event.target.files[0]
  }
  addMedications(){
    const medicineData = this.addMedicationForm.value;
    const formData = new FormData();
    formData.append('image', this.imageFile);
    formData.append('medicineName', medicineData.medicineName);
    formData.set('price', medicineData.price);
    formData.append('category_id', medicineData.category);
    
    this.medicationService.pharmacyAddMedication(medicineData, this.token ).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Thank You!",
          text: "Your Request Under Review!",
          icon: "success"
        })
        this.router.navigate([`listproduct/${this.pharmacyID}`])
      },
      
      error: (err: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      },
    });
  }
  

  getCategories() {
    this.http.get('http://localhost:8000/api/categories/').subscribe(
      (response: any) => {
        this.categories = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectedCategory(val: any) {
    this.category_id = val;
    console.log(this.category_id);
  }
}
