import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { SigurnosniLog } from '../models/sigurnosni-log';

@Injectable({
  providedIn: 'root'
})
export class SigurnostService {
  private apiUrl = 'http://localhost:8080/sigurnost';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(): Observable<SigurnosniLog[]> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token nije prisutan');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<SigurnosniLog[]>(this.apiUrl, { headers });
  }
}
