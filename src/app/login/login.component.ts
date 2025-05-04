import { Component } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string = ''; 
  successMessage: string = '';
  
  constructor(private korisnikService: KorisnikService, private formBuilder: FormBuilder, private router: Router) { }

  public form: FormGroup = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  public save()
  {
    let uname: string = this.form.value.username;
    this.korisnikService.login(this.form.value).subscribe(
      (response) => {
        sessionStorage.setItem('username_for_verification', uname);
        this.router.navigate(['/verify-code']);
      },
      (error) => {
        console.error('Greška prilikom prijave:', error.message);
        this.errorMessage = "Pogrešni kredencijali";
        this.successMessage = '';
      }
    );
    this.form.reset();
  }
}
