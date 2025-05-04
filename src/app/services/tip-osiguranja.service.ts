import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { TipOsiguranja } from '../models/tip-osiguranja';

@Injectable({
  providedIn: 'root'
})
export class TipOsiguranjaService {
  private apiUrl = 'http://localhost:8080/tip-osiguranjas';
  
  constructor(private http:HttpClient, private authService: AuthService) { }

  getAll(): Observable<TipOsiguranja[]> {
    const token = this.authService.getToken();
    
    if (!token) {
      throw new Error('Token nije prisutan');
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<TipOsiguranja[]>(this.apiUrl, { headers });
  }

  add(to: TipOsiguranja): Observable<TipOsiguranja> {
    const token = this.authService.getToken();
    
    if (!token) {
      throw new Error('Token nije prisutan');
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post<TipOsiguranja>(this.apiUrl, to, { headers });
  }

  delete(id: number): Observable<void> {
    const token = this.authService.getToken();
    
    if (!token) {
      throw new Error('Token nije prisutan');
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.delete<void>(this.apiUrl + "/" + id, { headers });
  }
}
