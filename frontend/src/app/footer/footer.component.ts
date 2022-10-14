import { Component, OnInit } from '@angular/core';
import {NavigationService} from "../services/navigation.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private navigation: NavigationService) { }

  ngOnInit(): void {
  }

  weiter() {
    this.navigation.nachestesKapitel();
  }

  zurueck() {
    this.navigation.vorherigesKapitel();
  }
}
