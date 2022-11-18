import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from "../services/navigation.service";
import {ContentProviderService, Foliendata} from "../services/content-provider.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-teaser',
  templateUrl: './teaser.component.html',
  styleUrls: ['./teaser.component.css']
})
export class TeaserComponent implements OnInit, OnDestroy {

  private contentSubscription: Subscription | undefined;
  data: Foliendata = new Foliendata();

  constructor(
    private navigationService: NavigationService,
    private contentProviderService: ContentProviderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const url = this.route.snapshot.url;
    const folieKapitelNummer = url[1] + '.' + url[3];
    const backend = this.contentProviderService.getBackendForSlide(folieKapitelNummer);
    this.contentSubscription = this.contentProviderService.fetchData(backend).subscribe((data: Foliendata) => {
      this.data = data;
    });
  }

  ngOnDestroy() {
    this.contentSubscription?.unsubscribe();
  }
}
