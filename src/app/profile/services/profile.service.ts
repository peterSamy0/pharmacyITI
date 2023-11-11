import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  Swal,{ SweetAlertIcon } from 'sweetalert2';

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

  getPharmacy(id: number, token:any){
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.httpClient.get(`http://127.0.0.1:8000/api/pharmacies/${id}`, options);
  }
  deletePharmacy(id : number, token:any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.httpClient.delete(`http://127.0.0.1:8000/api/pharmacies/${id}`, options);
  }
  getOrders() {
    return this.httpClient.get(`http://127.0.0.1:8000/api/orders`);
  }
  getDelivery(id: number, token:any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.httpClient.get(`http://127.0.0.1:8000/api/deliveries/${id}`, options);
  }

  deleteDelivery(id : number, token: any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.httpClient.delete(`http://127.0.0.1:8000/api/deliveries/${id}`, options);
  }
  getClient(id: number, token: any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.httpClient.get(`http://127.0.0.1:8000/api/clients/${id}`, options);
  }
  deleteClient(id : number, token: any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.httpClient.delete(`http://127.0.0.1:8000/api/clients/${id}`, options);
  }

  updateClient( id: number,body:any,  token:any){
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
   return this.httpClient.put(`http://localhost:8000/api/clients/${id}`, body, options)
  }
 
  updateDelivery( id: number,body:any, token:any){
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.httpClient.put(`http://localhost:8000/api/deliveries/${id}`, body, options)
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
      return this.httpClient.get(`${this.apiUrl}/governorates/${val}`)
    }

    // update pharmacy
    updatePharmacy(val:any, id:any, token:any){
      const headers = { 'Authorization': `Bearer ${token}` };
      const options = { headers: headers };
      return this.httpClient.put(`${this.apiUrl}/pharmacies/${id}`, val, options)
    }

    // get user data
    getUserData(val:any, token:any){
      const headers = { 'Authorization': `Bearer ${token}` };
      const options = { headers: headers };
      return this.httpClient.get(`${this.apiUrl}/pharmacies/${val}`, options)
    }



    // alert for errors
    errorAlert(){
      Swal.fire({
        title: 'Error!',
        text: 'invaled data',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
}
