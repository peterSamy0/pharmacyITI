import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category_id: number;
  category: string;
  pharmacyID: number;
  pharmacyMedicationID: number;
  // created_at: string;
  // updated_at: string;
}


export interface pharmacyProduct {
  id: number;
  medicine_name: string;
  pharmacyMedication_id:number;
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

  getPharmacyMedication(id:any, token:any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.get(`http://localhost:8000/api/pharmacies/${id}`, options);
  }
  getMedicine(id:any, token:any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.get(`http://localhost:8000/api/pharmacyMedications/${id}`, options);
  }
  addMedication(inputData: any) {
    return this.http.post(`http://localhost:8000/api/pharmacyMedications/`, inputData);
  }

  pharmacyAddMedication(inputData: any, token:any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.post(`http://localhost:8000/api/addMedicatonsByPharmacy/`, inputData, options);
  }

  updatePrice(id:any, data:any, token:any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.put(`http://localhost:8000/api/pharmacyMedications/${id}`, data, options);
  }

  deleteMedication(productId:number){
   return this.http.delete(`http://localhost:8000/api/pharmacyMedications/${productId}`)
  }
}

