import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {ContentProviderService, Foliendata} from "../services/content-provider.service";
import {Subscription} from "rxjs";
import {NavigationService} from "../services/navigation.service";

@Component({
  selector: 'app-folie',
  templateUrl: './folie.component.html',
  styleUrls: ['./folie.component.css']
})
export class FolieComponent implements OnInit, OnDestroy {

  data: Foliendata = new Foliendata();
  url: string = '';
  private contentSubscription: Subscription | undefined;
  private routerSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private contentProviderService: ContentProviderService,
    private navigationService: NavigationService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.url = this.route.snapshot.data['url'];
    this.route.data.subscribe(data => {
      this.url = data['url'];
    });

    this.initContentSubscription();
    this.initContentOnFolieChangeSubscription();
  }

  private initContentSubscription() {
    if (this.contentSubscription) {
      this.contentSubscription.unsubscribe();
    }
    this.contentSubscription = this.contentProviderService.fetchData(this.url).subscribe((data: Foliendata) => {
      this.data = data;
    });
  }

  private initContentOnFolieChangeSubscription() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!event.url.endsWith('1')) {
          this.contentSubscription?.unsubscribe();
          this.contentSubscription = this.contentProviderService.fetchData(this.url).subscribe((data: Foliendata) => {
            this.data = data;
          });
        }
      }
    });
  }


  ngOnDestroy() {
    this.contentSubscription?.unsubscribe();
  }
}
