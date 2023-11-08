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

  addMedication(inputData: object) {
    return this.http.post(`http://localhost:8000/api/medications`, inputData);
  }


  deleteMedication(productId:number){
   return this.http.delete(`http://localhost:8000/api/medications/${productId}`)
  }
}

