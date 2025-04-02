import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
   
    if (typeof window === 'undefined') {
      console.warn('AuthGuard: localStorage is not available.');
      return false;
    }

    const user = localStorage.getItem('loggedInUser');
    const isLoggedIn = !!user;  

    console.log('AuthGuard Check:', isLoggedIn);

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
