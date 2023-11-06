import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface DeliveryResponse {
  id?: number;
  name: string;
  Governorate: string;
  city: string;
  email: string;
  password: string;
  national_ID: number;
  available: number;
  phones?: Array<number>;
}

export interface PharmacyResponse {
  'pharmacy name': string;
  image: string;
  licence_number: string;
  bank_account: number;
  Governorate: string;
  city: string;
  street: string;
  opening: string;
  closing: string;
  medication: Array<any>;
}
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  getPharmacy(id: number) {
    return this.httpClient.get(`http://127.0.0.1:8000/api/pharmacies/${id}`);
  }
  deletePharmacy(id : number) {
    return this.httpClient.delete(`http://127.0.0.1:8000/api/pharmacies/${id}`);
  }
  getOrders() {
    return this.httpClient.get(`http://127.0.0.1:8000/api/orders`);
  }
}
