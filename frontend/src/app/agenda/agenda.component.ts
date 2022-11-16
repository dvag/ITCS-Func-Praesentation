import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Kapitel, NavigationService} from "../services/navigation.service";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  kapitel: Kapitel[] = [];

  constructor(private navigation: NavigationService) { }

  ngOnInit(): void {
    this.kapitel = this.navigation.kapitel;
  }

  weiter() {
    this.navigation.nachesteFolie();
  }

  zurueck() {
    this.navigation.vorherigeFolie();
  }
}
