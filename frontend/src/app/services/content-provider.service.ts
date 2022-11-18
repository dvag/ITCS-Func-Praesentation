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
    this.backends.set('1.2', 'https://func-itcsjava-ent-01.azurewebsites.net/api/javastandard');
    this.backends.set('2.2', 'https://func-itcsgolang-ent-01.azurewebsites.net/api/getStandardGo?');
    this.backends.set('2.3', 'https://func-itcsgolang-ent-01.azurewebsites.net/api/getPremiumGo?');
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
      titel: source.titel
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
