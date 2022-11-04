import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  aktuellesKapitel: number = 1;
  aktuelleFolie: number = 1;

  kapitel: Kapitel[] = [
    new Kapitel(1, 'Teaser', 2, ''),
    new Kapitel(2, 'Wer wir sind', 4, ''),
    new Kapitel(3, 'Warum Functions nutzen?', 2, ''),
    new Kapitel(4, 'Wann Functions nutzen?', 1, ''),
    new Kapitel(5, 'Was sind Nachteile?', 1, ''),
    new Kapitel(6, 'GoLang!', 1, ''),
    new Kapitel(7, 'Cup de Function', 1, '')
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
    public anzahlFolien: number,
    public apiUrl: string) {
  }
}


