import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const pendingVerification = localStorage.getItem('pendingVerification');

    if (pendingVerification === 'true') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
