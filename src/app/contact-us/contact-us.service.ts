import { Injectable } from '@angular/core';
import { Contactus } from './contactus';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private REST_API = 'http://localhost:8000/api/contactus';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) {}

  sendContactus(data: Contactus): Observable<any> {
    return this.httpClient.post(this.REST_API, data).pipe(catchError(this.handleError));
  }

  getAllContactus(): Observable<any> {
    return this.httpClient.get(this.REST_API).pipe(catchError(this.handleError));
  }

  getOneContactus(id: any): Observable<any> {
    const API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => res || {}),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
