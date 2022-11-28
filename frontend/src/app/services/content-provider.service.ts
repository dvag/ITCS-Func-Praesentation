import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentProviderService {

  private footerdataBroadcaster = new BehaviorSubject<Footerdata>(new Footerdata());

  private backends: Map<string, string> = new Map<string, string>();

  constructor(private httpClient: HttpClient) {
    this.backends.set('1.2', 'https://func-itcsjava-ent-01.azurewebsites.net/api/getStandardJava'); // Teaser
    this.backends.set('2.2', 'https://func-itcsjava-ent-01.azurewebsites.net/api/getPremiumJava'); // Wer wir sind
    this.backends.set('3.2', 'https://func-itcsts-ent-01.azurewebsites.net/api/getStandardTS'); // Was sind Functions
    this.backends.set('4.2', 'https://func-itcsts-ent-01.azurewebsites.net/api/getPremiumTS'); // Warum wechseln auf Functions
    this.backends.set('5.2', 'https://func-itcspython-ent-01.azurewebsites.net/api/getStandardPython'); // Anwendungsbereiche
    this.backends.set('6.2', 'https://func-itcspython-ent-01.azurewebsites.net/api/getPremiumPython'); // Nachteile
    this.backends.set('7.2', 'https://func-itcsgolang-ent-01.azurewebsites.net/api/getStandardGo'); // GoLang
    this.backends.set('8.2', 'https://func-itcsjava-ent-01.azurewebsites.net/api/getHandsOnJava1'); // HandsOn: HTTP Server
    this.backends.set('8.3', 'https://func-itcsts-ent-01.azurewebsites.net/api/getHandsOnTS1'); // HandsOn: Request Function
    this.backends.set('8.4', 'https://func-itcspython-ent-01.azurewebsites.net/api/getHandsOnPython'); // HandsOn: Function Definition
    this.backends.set('8.5', 'https://func-itcsgolang-ent-01.azurewebsites.net/api/getHandsOnGo'); // Function Host
    this.backends.set('8.6', 'https://func-itcsjava-ent-01.azurewebsites.net/api/getHandsOnJava2'); // Deployment
    this.backends.set('8.7', 'https://func-itcsts-ent-01.azurewebsites.net/api/getHandsOnTS2'); // Ansicht in Azure
  }

  fetchData(backend: string): Observable<Foliendata> {
    let requestStartTime = performance.now();
    return this.httpClient
      .get<ApiResponse>(
        backend,
        {
          headers: {
            'Access-Control-Allow-Methods': 'GET'
          }
        }
      ).pipe(
        map(
          (source: ApiResponse) => {
            let requestEndTime = performance.now();
            const duration = this.calculateDuration(requestStartTime, requestEndTime);
            this.mapResponseToFooterdata(source, duration);
            return ContentProviderService.mapResponseToFoliendata(source);
          }
        )
      );
  }

  public onFooterdataChanged(): BehaviorSubject<Footerdata> {
    return this.footerdataBroadcaster;
  }

  private mapResponseToFooterdata(source: ApiResponse, duration: number) {
    let newFooterdata = new Footerdata();
    newFooterdata.duration = duration;
    newFooterdata.plan = source.plan;
    newFooterdata.language = source.language;
    this.footerdataBroadcaster.next(newFooterdata);
  }

  private static mapResponseToFoliendata(source: ApiResponse): Foliendata {
    return {
      picturePos: source.picturePos,
      pictureUrl: source.pictureUrl,
      text: source.text,
      title: source.title
    }
  }

  calculateDuration(startTime: number, endTime: number): number {
    return Math.round(endTime - startTime);
  }

  getBackendForSlide(folieKapitelNummer: string): string {
    return this.backends.get(folieKapitelNummer)!;
  }
}

export interface ApiResponse {
  title: string;
  language: string;
  plan: string;
  chapter: number;
  Side: string;
  pictureUrl: string;
  picturePos: string;
  text: PresentationText[];
}

export interface PresentationText {
  text: string;
  type: string;
}

export class Foliendata {
  title: string = '';
  pictureUrl: string = '';
  picturePos: string = '';
  text: PresentationText[] = [];
}

export class Footerdata {
  language: string = '';
  plan: string = '';
  duration: number = 0;
}
