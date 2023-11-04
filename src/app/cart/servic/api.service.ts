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

  createResource(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
  // function that gets all users
  allOrders(){
    return this.http.get("http://localhost:8000/api/orders")
  }
}