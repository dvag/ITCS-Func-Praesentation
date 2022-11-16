import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentProviderService {

  private footerdataBroadcaster = new BehaviorSubject<Footerdata>(new Footerdata());

  constructor(private httpClient: HttpClient) {

  }

  fetchData(backend: string): Observable<Foliendata> {
    let requestStartTime = performance.now();
    return this.httpClient
      .get<ApiResponse>(
        backend,
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
