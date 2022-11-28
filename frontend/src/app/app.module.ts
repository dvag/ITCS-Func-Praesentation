import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DesignSystemModule} from "@dvag/design-system-angular";
import {AgendaComponent} from './agenda/agenda.component';
import {KapitelstartComponent} from './kapitelstart/kapitelstart.component';
import {FolieComponent} from './folie/folie.component';
import {HttpClientModule} from "@angular/common/http";
import {FooterComponent} from './footer/footer.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { AbschlussComponent } from './abschluss/abschluss.component';

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    KapitelstartComponent,
    FolieComponent,
    FooterComponent,
    AbschlussComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DesignSystemModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
