import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SigurnosniLog } from '../models/sigurnosni-log';
import { SigurnostService } from '../services/sigurnost.service';

@Component({
  selector: 'app-siem',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './siem.component.html',
  styleUrl: './siem.component.css'
})
export class SiemComponent implements OnInit {
  sigurnosniLogs: SigurnosniLog[] = [];
  paginatedSigurnosniLogs: SigurnosniLog[] = [];

  currentPage: number = 1;
  pageSize: number = 5;
  numOfPages: number = 0;

  infoPoruka: string = "";

  constructor(private sigurnosntService: SigurnostService) {}
  

  ngOnInit(): void {
    this.sigurnosntService.getAll().subscribe(data => {
      this.sigurnosniLogs = data;
      this.numOfPages = Math.ceil(this.sigurnosniLogs.length / this.pageSize);
      this.updateTable();
    });
  }

  get ukupneStraneArray(): number[] {
    return Array(this.numOfPages).fill(0).map((_, i) => i + 1);
  }

  updateTable(): void {
    const begin = (this.currentPage - 1) * this.pageSize;
    const end = begin + this.pageSize;
    this.paginatedSigurnosniLogs = this.sigurnosniLogs.slice(begin, end);
  }

  changePage(novaStrana: number): void {
    if (novaStrana < 1 || novaStrana > this.numOfPages) return;
    this.currentPage = novaStrana;
    this.updateTable();
  }
}
