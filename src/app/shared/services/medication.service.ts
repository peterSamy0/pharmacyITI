import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category_id: number;
  category: string;
  // created_at: string;
  // updated_at: string;
}

export interface pharmacyProduct {
  id: number;
  medicine_name: string;
  medicine_price: number;
  medicine_image: string;
  category_id: number;
  medicine_category: string;
  // created_at: string;medicine_name
  // updated_at: string;
}
export interface UpdatedProduct {
  product: Product;
}
@Injectable({
  providedIn: 'root'
})

export class MedicationService {

  constructor( private http:HttpClient) { }

  getMedication() {
    return this.http.get(`http://localhost:8000/api/medications`);
  }

  getPharmacyMedication(id:any) {
    return this.http.get(`http://localhost:8000/api/pharmacies/${id}`);
  }

  addMedication(inputData: object) {
    return this.http.post(`http://localhost:8000/api/pharmacyMedication/`, inputData);
  }

  getMedicationToEdit(productId: number) {
    return this.http.get<Product>(
      `http://localhost:8000/api/medications/${productId}`
    );
  }

  update(inputData: object, productId: number) {
    return this.http.put(
      `http://localhost:8000/api/medications/${productId}`,
      inputData
    );
  }

  deleteMedication(productId:number){
   return this.http.delete(`http://localhost:8000/api/medications/${productId}`)
  }
}

