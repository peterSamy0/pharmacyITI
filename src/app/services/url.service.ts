import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UrlService {
  // apiURL = environment.apiUrl;
  // imageURL = environment.imageBaseUrl;
  apiURL = 'http://127.0.0.1:8000/api';
  imageBaseURL = 'http://localhost:8000/storage';
  constructor(private http: HttpClient) { }
  
  // *******************delete user ******************//
  deleteUser(id : number, token: string) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.delete(`${this.apiURL}/users/${id}`, options);
  }

  // ************************** pharmacy *****************//
  // function to get one pharmacy data for client without authrization
  getPharmacyData(id:any){
    return this.http.get(`${this.apiURL}/showPharmacy/${id}`)
  }

  // function to get all pharmacies data
  getPharmaciesData(){
    return this.http.get(`${this.apiURL}/pharmacies`)
  }

  // function to get one pharmacy data for pharmacy using authrization  
  getPharmacy(id: number, token:any){
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.get(`${this.apiURL}/pharmacies/${id}`, options);
  }

   //  function to update pharmacy
   updatePharmacyData(val:any, id:any, token:string){
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.put(`${this.apiURL}/pharmacies/${id}`, val, options)
  }


  // ************************** client *****************// ${this.apiURL}
  // get client data 
  getClientData(id: number, token: any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.get(`${this.apiURL}/clients/${id}`, options);
  }
  // update client data 
  updateClientData( id: number,body:any,  token:any){
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
   return this.http.put(`${this.apiURL}/clients/${id}`, body, options)
  }


  // ************************** delivery *****************// ${this.apiURL}
  // get delivery data 
  getDeliveryData(id: number, token:any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.get(`${this.apiURL}/deliveries/${id}`, options);
  }
  // update delivery data
  updateDeliveryData( id: number,body:any, token:any){
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.put(`${this.apiURL}/deliveries/${id}`, body, options)
   }


  // ************************** governorates *****************// 
  // function to get all gavernorates 
  getGovernorates() {
    return this.http.get(`${this.apiURL}/governorates`, { params: { home: true } });
  }
  // dropdown list of cities of selected governorate 
  selectedGov(govName: number){
    return this.http.get(`${this.apiURL}/governorates/${govName}`)
  }
  // get all days of weeks
  // get days
  getDays(){
    return this.http.get(`${this.apiURL}/days`)
  } 

  // ************************** orders *****************// 
  getOrders(token:any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.get(`${this.apiURL}/orders`, options);
  }

  // function to update status of delivery
  getUpdateOrder(id:any, token:any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    this.http.patch(`http://localhost:8000/api/orders/${id}`, {}, options)
  }

  // ************************** medicatons *****************// ${this.apiURL}
  // function to update price in pharamcy medication table
  updatePrice(id:any, data:any, token:any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.put(`${this.apiURL}/pharmacyMedications/${id}`, data, options);
  }

  // function to delete medication in pharamcy medication table
  deleteMedication(productId:number, token:any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.delete(`${this.apiURL}/pharmacyMedications/${productId}`, options);
  }

  // function to get medications of pharmacy from pharamcy medication table
  getPharmacyMedication(id:any, token:any) {
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.get(`${this.apiURL}/pharmacies/${id}`, options);
  }

}
