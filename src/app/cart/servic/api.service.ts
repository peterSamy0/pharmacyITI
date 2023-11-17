import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000/api/orders';

  constructor(private http: HttpClient) {};
  // function that define headers

  createResource(data: any, token:any): Observable<any> {
   
    const headers = { 'Authorization': `Bearer ${token}`};
    const options = { headers: headers };
    return this.http.post(this.apiUrl, data, options);
  }
  // function that gets all users
  allClientOrders(userID:any, token:any){
    const headers = { 'Authorization': `Bearer ${token}` };
    const options = { headers: headers };
    return this.http.get(`http://localhost:8000/api/clients/${userID}`, options)
  }

  allOrders(){
    return this.http.get(`http://localhost:8000/api/orders`,{
      headers:{
        Authorization:"Bearer " + localStorage.getItem('token') 
      }
    })
  }
}