import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      return true; // Token exists in local storage
    } else {
      this.router.navigate(['/signIn']);
      return false; // Token doesn't exist in local storage
    }
  }
}
