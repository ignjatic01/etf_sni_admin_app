import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { roleGuard } from './auth/role.guard';
import { VerificationGuard } from './auth/verification.guard';
import { VerifyComponent } from './verify/verify.component';
import { TipOsiguranjaComponent } from './tip-osiguranja/tip-osiguranja.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { SiemComponent } from './siem/siem.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "test", component: TestComponent, canActivate: [roleGuard], data: {roles: ['ADMIN', 'ZAPOSLENI']}},
    {path: 'verify-code', component: VerifyComponent, canActivate: [VerificationGuard]},
    {path: "usluge", component: TipOsiguranjaComponent, canActivate: [roleGuard], data: {roles: ['ADMIN', 'ZAPOSLENI']}},
    {path: "sigurnost", component: SiemComponent, canActivate: [roleGuard], data: {roles: ['ADMIN']}},
    {path: "korisnici", component: KorisnikComponent, canActivate: [roleGuard], data: {roles: ['ADMIN', 'ZAPOSLENI']}}
];
