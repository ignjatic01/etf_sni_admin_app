import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KorisnikDto } from '../models/korisnik-dto';
import { Uloga } from '../models/uloga';
import { KorisnikService } from '../services/korisnik.service';
import { UlogaService } from '../services/uloga.service';

@Component({
  selector: 'app-korisnik',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './korisnik.component.html',
  styleUrl: './korisnik.component.css'
})
export class KorisnikComponent implements OnInit {
  korisniks: KorisnikDto[] = [];
  paginatedKorisniks: KorisnikDto[] = [];

  ulogas: Uloga[] = [];
  selectedUlogaId: number = 0;

  currentPage: number = 1;
  pageSize: number = 3;
  numOfPages: number = 0;

  infoPoruka: string = "";

  public form: FormGroup;
  //public updateForm!: FormGroup;

  private selectedKorisnik? : KorisnikDto;
  public selectedUloga? : Uloga;

  constructor(private formBuilder: FormBuilder, private korisnikService: KorisnikService, private ulogaService: UlogaService) {
    this.form = this.formBuilder.group({
      ime: [null, Validators.required],
      prezime: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required],
      ulogaId: [null, Validators.required],
      blokiran: [false]
    });
  }
  

  ngOnInit(): void {
    this.korisnikService.getAllDto().subscribe(data => {
      this.korisniks = data;
      this.numOfPages = Math.ceil(this.korisniks.length / this.pageSize);
      this.updateTable();
    });
    this.ulogaService.getAll().subscribe(data => {
      this.ulogas = data;
    })
  }

  get ukupneStraneArray(): number[] {
    return Array(this.numOfPages).fill(0).map((_, i) => i + 1);
  }

  updateTable(): void {
    const begin = (this.currentPage - 1) * this.pageSize;
    const end = begin + this.pageSize;
    this.paginatedKorisniks = this.korisniks.slice(begin, end);
  }

  changePage(novaStrana: number): void {
    if (novaStrana < 1 || novaStrana > this.numOfPages) return;
    this.currentPage = novaStrana;
    this.updateTable();
  }

  onProizvodjacChange() {
    const selectedUloga = this.ulogas.find(ul => ul.id === +this.selectedUlogaId);
  }

  obrisi(kor: KorisnikDto) {
    if(kor?.id !== undefined) {
      this.korisnikService.delete(kor.id).subscribe(data => {
          this.korisnikService.getAllDto().subscribe(data => {
          this.korisniks = data;
          this.numOfPages = Math.ceil(this.korisniks.length / this.pageSize);
          this.updateTable();
        });
      });
    }
  }
  
  
  blokiraj(kor: KorisnikDto) {
    this.korisnikService.blokiraj(kor).subscribe(k => {
      this.korisnikService.getAllDto().subscribe(data => {
        this.korisniks = data;
        this.numOfPages = Math.ceil(this.korisniks.length / this.pageSize);
        this.updateTable();
      })
    })
  }
  

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const formValue = { ...this.form.value };

    const jsonData = {
      ime: formValue.ime,
      prezime: formValue.prezime,
      username: formValue.username,
      password: formValue.password,
      email: formValue.email,
      uloga: {
        id: parseInt(formValue.ulogaId),
        naziv: ''
      },
      blokiran: formValue.blokiran
    };
  
    this.korisnikService.add(jsonData).subscribe({
      next: res => {
        console.log('Uspješno sačuvano!', res)
        this.korisnikService.getAllDto().subscribe(data => {
          this.korisniks = data;
          this.numOfPages = Math.ceil(this.korisniks.length / this.pageSize);
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
