import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router, public authService: AuthService) { }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_full');
    document.cookie = "auth_token=; Path=/; Domain=localhost; Max-Age=0";
    this.router.navigate(['/login']);
  }
}
