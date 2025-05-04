import { Uloga } from "./uloga";

export interface KorisnikDto {
    id?: number;
    ime: string;
    prezime: string;
    username: string;
    email: string;
    uloga: Uloga;
    blokiran: boolean;
}