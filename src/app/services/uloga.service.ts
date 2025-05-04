import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Uloga } from '../models/uloga';

@Injectable({
  providedIn: 'root'
})
export class UlogaService {
  private apiUrl = 'http://localhost:8080/ulogas';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(): Observable<Uloga[]> {
    const token = this.authService.getToken();
    
    if (!token) {
      throw new Error('Token nije prisutan');
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<Uloga[]>(this.apiUrl, { headers });
  }
}
