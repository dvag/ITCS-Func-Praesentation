import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DesignSystemModule} from "@dvag/design-system-angular";
import { AgendaComponent } from './agenda/agenda.component';
import { KapitelstartComponent } from './kapitelstart/kapitelstart.component';
import { FolieComponent } from './folie/folie.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    KapitelstartComponent,
    FolieComponent,
    FooterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DesignSystemModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
