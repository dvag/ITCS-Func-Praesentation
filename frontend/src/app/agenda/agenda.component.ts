import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  weiter() {
    this.router.navigate(
      ['/kapitelZwei'],
      {
        queryParams: {
          "kapitelNummer": 2,
          "kapitelTitel": "Wer sind wir"
        },
        queryParamsHandling: "preserve"
      }
    );
  }
}
