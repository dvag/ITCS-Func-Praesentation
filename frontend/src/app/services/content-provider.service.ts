import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, from, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentProviderService {

  private backendCounter: number = -1;
  private footerdataBroadcaster = new BehaviorSubject<Footerdata>(new Footerdata());

  backends: string[] = [
    'https://func-itcsjava-ent-01.azurewebsites.net/api/javastandard',
    'https://func-itcsgolang-ent-01.azurewebsites.net/api/getStandardGo?',
    'https://func-itcsgolang-ent-01.azurewebsites.net/api/getPremiumGo?'
  ]

  constructor(private httpClient: HttpClient) {

  }

  fetchData(): Observable<Foliendata> {
    let requestStartTime = performance.now();
    return this.httpClient
      .get<ApiResponse>(
        this.getNextBackend(),
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'Access-Control-Allow-Methods': 'GET',
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
      titel: source.titel
    }
  }

  calculateDuration(startTime: number, endTime: number): number {
    return Math.round(endTime - startTime);
  }

  private getNextBackend(): string {
    if (this.backendCounter < this.backends.length - 1) {
      this.backendCounter++;
    } else {
      this.backendCounter = 0;
    }
    return this.backends[this.backendCounter];
  }
}

export interface ApiResponse {
  titel: string;
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
  titel: string = '';
  pictureUrl: string = '';
  picturePos: string = '';
  text: PresentationText[] = [];
}

export class Footerdata {
  language: string = '';
  plan: string = '';
  duration: number = 0;
}
