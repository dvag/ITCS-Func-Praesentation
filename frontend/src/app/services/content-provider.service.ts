import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentProviderService {

  private backendCounter: number = -1;

  backends: string[] = [
    'https://func-itcsjava-ent-01.azurewebsites.net/api/javastandard',
    'https://func-itcsgolang-ent-01.azurewebsites.net/api/getStandardGo?',
    'https://func-itcsgolang-ent-01.azurewebsites.net/api/getPremiumGo?'
  ]

  constructor(private httpClient: HttpClient) {

  }

  fetchData(): Observable<Foliendata> {
    console.log('Fetch Data called')
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
            return ContentProviderService.mapResponseToFoliendata(source, duration);
          }
        )
      );
  }

  private static mapResponseToFoliendata(source: ApiResponse, duration: number): Foliendata {
    return {
      duration: duration,
      language: source.language,
      picturePos: source.picturePos,
      pictureUrl: source.pictureUrl,
      plan: source.plan,
      text: source.text,
      titel: source.titel
    }
  }

  calculateDuration(startTime: number, endTime: number): number {
    return endTime - startTime;
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
  titel: string = "";
  language: string = "";
  plan: string = "";
  pictureUrl: string = "";
  picturePos: string = "";
  text: PresentationText[] = [];
  duration: number = 0;
}
