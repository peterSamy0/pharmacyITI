// payment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://your-php-backend-url'; // Replace with your actual PHP backend URL

  constructor(private http: HttpClient) { }

  pay(amount: number): Observable<any> {
    const url = `${this.baseUrl}/pay`;
    const data = { amount };

    return this.http.post(url, data);
  }

  success(paymentId: string, buyerId: string): Observable<any> {
    const url = `${this.baseUrl}/success`;
    const data = { paymentId, buyerId };

    return this.http.post(url, data);
  }

  error(): Observable<any> {
    const url = `${this.baseUrl}/error`;

    return this.http.get(url);
  }
}
