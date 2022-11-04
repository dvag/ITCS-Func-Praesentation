import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from "../services/navigation.service";
import {ContentProviderService, Foliendata} from "../services/content-provider.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-teaser',
  templateUrl: './teaser.component.html',
  styleUrls: ['./teaser.component.css']
})
export class TeaserComponent implements OnInit, OnDestroy {

  private contentSubscription: Subscription | undefined;
  data: Foliendata = new Foliendata();

  constructor(private navigationService: NavigationService, private contentProviderService: ContentProviderService) { }

  ngOnInit(): void {
    this.contentSubscription = this.contentProviderService.fetchData().subscribe((data: Foliendata) => {
      this.data = data;
    });
  }

  weiter() {
    this.navigationService.nachesteFolie();
  }

  zurueck() {
    this.navigationService.vorherigeFolie();
  }

  ngOnDestroy() {
    this.contentSubscription?.unsubscribe();
  }
}
