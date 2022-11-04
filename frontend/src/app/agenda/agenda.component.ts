import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NavigationService} from "../services/navigation.service";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor(private navigation: NavigationService) { }

  ngOnInit(): void {
  }

  weiter() {
    this.navigation.nachesteFolie();
  }

  zurueck() {
    this.navigation.vorherigeFolie();
  }
}
