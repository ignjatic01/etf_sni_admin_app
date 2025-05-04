import { Uloga } from "./uloga";

export interface KorisnikFull {
    id?: number;
    ime?: string;
    prezime?: string;
    username: string;
    password?: string;
    email: string;
    uloga: Uloga;
    blokiran: boolean;
}