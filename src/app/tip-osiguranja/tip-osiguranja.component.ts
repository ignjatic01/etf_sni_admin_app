import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipOsiguranja } from '../models/tip-osiguranja';
import { TipOsiguranjaService } from '../services/tip-osiguranja.service';

@Component({
  selector: 'app-tip-osiguranja',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './tip-osiguranja.component.html',
  styleUrl: './tip-osiguranja.component.css'
})
export class TipOsiguranjaComponent implements OnInit {
  tipOsiguranjas: TipOsiguranja[] = [];
  paginatedTipOsiguranjas: TipOsiguranja[] = [];

  currentPage: number = 1;
  pageSize: number = 3;
  numOfPages: number = 0;

  infoPoruka: string = "";

  public form: FormGroup;

  private selectedTipOsiguranja? : TipOsiguranja;

  constructor(private formBuilder: FormBuilder, private tipOsiguranjaService: TipOsiguranjaService) {
    this.form = this.formBuilder.group({
      naziv: [null, Validators.required],
      rizik: [null, Validators.required]
    });
  }
  

  ngOnInit(): void {
    this.tipOsiguranjaService.getAll().subscribe(data => {
      this.tipOsiguranjas = data;
      this.numOfPages = Math.ceil(this.tipOsiguranjas.length / this.pageSize);
      this.updateTable();
    });
  }

  get ukupneStraneArray(): number[] {
    return Array(this.numOfPages).fill(0).map((_, i) => i + 1);
  }

  updateTable(): void {
    const begin = (this.currentPage - 1) * this.pageSize;
    const end = begin + this.pageSize;
    this.paginatedTipOsiguranjas = this.tipOsiguranjas.slice(begin, end);
  }

  changePage(novaStrana: number): void {
    if (novaStrana < 1 || novaStrana > this.numOfPages) return;
    this.currentPage = novaStrana;
    this.updateTable();
  }


  obrisi(to: TipOsiguranja) {
    if(to?.id !== undefined) {
      this.tipOsiguranjaService.delete(to.id).subscribe(data => {
          this.tipOsiguranjaService.getAll().subscribe(data => {
          this.tipOsiguranjas = data;
          this.numOfPages = Math.ceil(this.tipOsiguranjas.length / this.pageSize);
          this.updateTable();
        });
      });
    }
  }
  

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const formValue = { ...this.form.value };

    const jsonData = {
      naziv: formValue.naziv,
      rizik: formValue.rizik
    };
  
    this.tipOsiguranjaService.add(jsonData).subscribe({
      next: res => {
        console.log('Uspješno sačuvano!', res)
        this.tipOsiguranjaService.getAll().subscribe(data => {
          this.tipOsiguranjas = data;
          this.numOfPages = Math.ceil(this.tipOsiguranjas.length / this.pageSize);
          this.updateTable();
        });
        this.form.reset();
        const closeBtn = document.getElementById("closeAddBtn");
        if(closeBtn) {
          closeBtn.click();
        }
        this.infoPoruka = "";
      },
      error: err => console.error('Greška prilikom čuvanja', err)
    });
  }
}
