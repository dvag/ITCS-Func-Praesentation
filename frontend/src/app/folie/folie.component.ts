import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-folie',
  templateUrl: './folie.component.html',
  styleUrls: ['./folie.component.css']
})
export class FolieComponent implements OnInit {
  aktuellesKapitel: number;
  aktuelleFolie: number;

  constructor(private route: ActivatedRoute) {
    this.aktuellesKapitel = 1;
    this.aktuelleFolie = 1;
  }

  ngOnInit(): void {
    this.route.params.subscribe((queryParams) => {
      const aktuellesKapitelId = queryParams['kapitelId'];
      const aktuelleFoliendId = queryParams['folienId'];

      this.aktuellesKapitel = aktuellesKapitelId;
      this.aktuelleFolie = aktuelleFoliendId;
    });
  }

}
