import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Kapitel, NavigationService} from "../services/navigation.service";

@Component({
  selector: 'app-kapitelstart',
  templateUrl: './kapitelstart.component.html',
  styleUrls: ['./kapitelstart.component.css']
})
export class KapitelstartComponent implements OnInit {

  kapitel: Kapitel = new Kapitel(0, '', 0,'');

  constructor(private route: ActivatedRoute, private navigation: NavigationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((queryParams) => {
      const aktuellesKapitelId = queryParams['kapitelId'];
      this.kapitel = this.navigation.kapitel.find(kapitel => kapitel.id == aktuellesKapitelId)!;
    });
  }

}
