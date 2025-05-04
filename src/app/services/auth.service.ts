import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';

  constructor() { }

  getToken(): string | null {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${this.tokenKey}=`))?.split('=')[1];
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }

  getCurrentUser(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload);
      return payload;
    } catch (e) {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    if (!user || !user.role) {
      return false;
    }
    return roles.includes(user.role);
  }

  logout(): void {
    document.cookie = `${this.tokenKey}=; Max-Age=0; path=/; domain=localhost`; // Brisanje kukija
  }

  setToken(token: string): void {
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); 
    document.cookie = `${this.tokenKey}=${encodeURIComponent(token)}; expires=${expires.toUTCString()}; path=/; domain=localhost; Secure; HttpOnly`;
  }
}
