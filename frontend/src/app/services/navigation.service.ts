import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  aktuellesKapitel: number = 1;
  aktuelleFolie: number = 1;

  kapitel: Kapitel[] = [
    new Kapitel(1, 'Teaser', 2),
    new Kapitel(2, 'Wer wir sind', 2),
    new Kapitel(3, 'Was sind Functions?', 2),
    new Kapitel(4, 'Warum wechseln?', 2),
    new Kapitel(5, 'Anwendungsbereiche', 2),
    new Kapitel(6, 'Nachteile', 2),
    new Kapitel(7, 'GoLang', 2),
    new Kapitel(8, 'Hands On', 7)
  ];


  constructor(private router: Router) {
  }

  nachesteFolie() {
    if (this.aktuelleFolie == this.kapitel[this.aktuellesKapitel - 1].anzahlFolien) {
      if (this.aktuellesKapitel < this.kapitel.length) {
        this.aktuelleFolie = 1;
        this.router.navigate(['kapitel', ++this.aktuellesKapitel, 'folie', this.aktuelleFolie]);
      }
    } else {
      this.router.navigate(['kapitel', this.aktuellesKapitel, 'folie', ++this.aktuelleFolie]);
    }
  }

  vorherigeFolie() {
    if (this.aktuelleFolie == 1) {
      if (this.aktuellesKapitel > 1) {

        const vorherigesKapitel = this.aktuellesKapitel - 1;
        const letzteFolieVorherigesKapitel = this.kapitel[vorherigesKapitel - 1].anzahlFolien;

        this.aktuellesKapitel = vorherigesKapitel;
        this.aktuelleFolie = letzteFolieVorherigesKapitel;

        this.router.navigate(['kapitel', this.aktuellesKapitel, 'folie', this.aktuelleFolie]);
      }
    } else {
      this.router.navigate(['kapitel', this.aktuellesKapitel, 'folie', --this.aktuelleFolie]);
    }

  }
}

export class Kapitel {
  constructor(
    public id: number,
    public titel: string,
    public anzahlFolien: number) {
  }
}


