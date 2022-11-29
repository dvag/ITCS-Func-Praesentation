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
  loading: boolean = true;
  hasText: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private contentProviderService: ContentProviderService,
    private navigationService: NavigationService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.updateBackendUrl();
    this.initContentSubscription();
    this.initContentOnFolieChangeSubscription();
  }

  private updateBackendUrl() {
    const url = this.route.snapshot.url;
    const folieKapitelNummer = url[1] + '.' + url[3];
    this.url = this.contentProviderService.getBackendForSlide(folieKapitelNummer);
  }

  private updateBackendUrlWithUrl(urlStr: string) {
    const url: string[] = urlStr.split("/");
    const folieKapitelNummer = url[2] + '.' + url[4];
    this.url = this.contentProviderService.getBackendForSlide(folieKapitelNummer);
  }

  private initContentSubscription() {
    if (this.contentSubscription) {
      this.contentSubscription.unsubscribe();
    }
    this.contentSubscription = this.contentProviderService.fetchData(this.url).subscribe((data: Foliendata) => {
      this.data = data;
      this.hasText = data.text.length > 0;
      this.loading = false;
    });
  }

  private initContentOnFolieChangeSubscription() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!event.url.endsWith('1')) {
          this.updateBackendUrlWithUrl(event.url);
          this.contentSubscription?.unsubscribe();
          this.contentSubscription = this.contentProviderService.fetchData(this.url).subscribe((data: Foliendata) => {
            this.data = data;
            this.hasText = data.text.length > 0;
            this.loading = false;
          });
        }
      }
    });
  }


  ngOnDestroy() {
    this.contentSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }
}
