import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ContentProviderService, Footerdata} from "../services/content-provider.service";
import {NavigationService} from "../services/navigation.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  data: Footerdata = {
    duration: 0,
    language: '',
    plan: ''
  }

  showDuration: boolean = false;

  private footerDataSubscription: Subscription | undefined = undefined;

  constructor(private navigationService: NavigationService, private contentProviderService: ContentProviderService) { }

  ngOnInit(): void {
    this.footerDataSubscription = this.contentProviderService.onFooterdataChanged().subscribe(data => {
      this.data = data;
      this.showDuration = data.language != '';
    });
  }

  ngOnDestroy(): void {
    if(this.footerDataSubscription) {
      this.footerDataSubscription.unsubscribe();
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key == 'ArrowRight' || event.key == 'PageDown'){
      this.weiter();
    }
    if(event.key == 'ArrowLeft' || event.key == 'PageUp'){
      this.zurueck();
    }
  }

  weiter() {
    this.showDuration = false;
    this.navigationService.nachesteFolie();
  }

  zurueck() {
    this.showDuration = false;
    this.navigationService.vorherigeFolie();
  }


}
