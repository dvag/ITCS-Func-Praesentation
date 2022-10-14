import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentProviderService {

  backends: string[] = [
    'https://func-itcsgolang-ent-01.azurewebsites.net/api/getStandardGo?',
    'https://func-itcsgolang-ent-01.azurewebsites.net/api/getPremiumGo?'
  ]

  constructor() { }
}
