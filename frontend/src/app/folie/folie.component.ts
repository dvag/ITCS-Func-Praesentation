import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {ContentProviderService, Foliendata} from "../services/content-provider.service";
import {Subscription} from "rxjs";
import {NavigationService} from "../services/navigation.service";

@Component({
  selector: 'app-folie',
  templateUrl: './folie.component.html',
  styleUrls: ['./folie.component.css']
})
export class FolieComponent implements OnInit, OnDestroy, OnChanges {

  data: Foliendata = new Foliendata();
  aktuellesKapitel: number;
  aktuelleFolie: number;
  private contentSubscription: Subscription | undefined;
  private routerSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private contentProviderService: ContentProviderService,
    private navigationService: NavigationService,
    private router: Router) {
    this.aktuellesKapitel = 1;
    this.aktuelleFolie = 1;
  }

  ngOnInit(): void {
    this.aktuellesKapitel = this.route.snapshot.queryParams['kapitelId']
    this.aktuelleFolie = this.route.snapshot.queryParams['folienId']

    this.route.params.subscribe((queryParams) => {
      const aktuellesKapitelId = queryParams['kapitelId'];
      const aktuelleFoliendId = queryParams['folienId'];

      this.aktuellesKapitel = aktuellesKapitelId;
      this.aktuelleFolie = aktuelleFoliendId;
    });

    this.initContentSubscription();
    this.initContentOnFolieChangeSubscription();
  }

  private initContentSubscription() {
    if(this.contentSubscription) {
      this.contentSubscription.unsubscribe();
    }
    this.contentSubscription = this.contentProviderService.fetchData().subscribe((data: Foliendata) => {
      this.data = data;
    });
  }

  private initContentOnFolieChangeSubscription() {
    this.routerSubscription = this.router.events.subscribe(event => {
    if(event instanceof NavigationStart) {
      if(!event.url.endsWith('1')) {
        this.contentSubscription?.unsubscribe();
        this.contentSubscription = this.contentProviderService.fetchData().subscribe((data: Foliendata) => {
          this.data = data;
        });
      }
    }
  });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnDestroy() {
    this.contentSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }
}
