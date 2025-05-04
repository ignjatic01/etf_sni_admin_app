import { Component, OnInit } from '@angular/core';
import { KorisnikFull } from '../models/korisnikFull';
import { CommonModule } from '@angular/common';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  
  korisniks: KorisnikFull[] = [];

  constructor(private korisnikService: KorisnikService) { }

  ngOnInit(): void {
    this.korisnikService.getAll().subscribe(data => {
      this.korisniks = data;
    });
  }
}
