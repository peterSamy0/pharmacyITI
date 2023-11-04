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

@Injectable({
  providedIn: 'root',
})
export class DeliveryServiceService {
  constructor(private httpClient: HttpClient) {}

  getDelivery(){
    return this.httpClient.get(`http://127.0.0.1:8000/api/deliveries`);

  }
  saveDelivery(inputData : object){
    return this.httpClient.post(`http://127.0.0.1:8000/api/deliveries`,inputData);
  }
}
