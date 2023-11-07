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

  apiUrl: string = 'http://127.0.0.1:8000/api';

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
  getDelivery(id: number) {
    return this.httpClient.get(`http://127.0.0.1:8000/api/deliveries/${id}`);
  }
  deleteDelivery(id : number) {
    return this.httpClient.delete(`http://127.0.0.1:8000/api/deliveries/${id}`);
  }
  getClient(id: number) {
    return this.httpClient.get(`http://127.0.0.1:8000/api/clients/${id}`);
  }
  deleteClient(id : number) {
    return this.httpClient.delete(`http://127.0.0.1:8000/api/clients/${id}`);
  }


    // api for governorates
    getGovernorates(){
      return this.httpClient.get(`${this.apiUrl}/governorates`)
    }

    // get days
    getDays(){
      return this.httpClient.get(`${this.apiUrl}/days`)
    }

    // dropdown list of cities in  governorate 
    selectedGov(val: any){
      return this.httpClient.get(`http://localhost:8000/api/governorates/${val}`)
    }
}
