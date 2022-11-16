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

    let url = this.route.snapshot.data['url'];

    this.contentSubscription = this.contentProviderService.fetchData(url).subscribe((data: Foliendata) => {
      this.data = data;
    });

  }

  ngOnDestroy() {
    this.contentSubscription?.unsubscribe();
  }
}
