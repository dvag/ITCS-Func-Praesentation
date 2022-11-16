import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KapitelstartComponent} from "./kapitelstart/kapitelstart.component";
import {TeaserComponent} from "./teaser/teaser.component";
import {FolieComponent} from "./folie/folie.component";
import {AgendaComponent} from "./agenda/agenda.component";

const backends: string[] = [
  'https://func-itcsjava-ent-01.azurewebsites.net/api/javastandard',
  'https://func-itcsgolang-ent-01.azurewebsites.net/api/getStandardGo?',
  'https://func-itcsgolang-ent-01.azurewebsites.net/api/getPremiumGo?'
]

const routes: Routes = [
  {path: '', redirectTo: '/kapitel/1/folie/1', pathMatch: 'full'},
  {path: 'kapitel/1/folie/1', component: TeaserComponent, data: {url: backends[0]}},
  {path: 'kapitel/1/folie/2', component: AgendaComponent},
  {path: 'kapitel/:kapitelId/folie/1', component: KapitelstartComponent},
  {path: 'kapitel/2/folie/2', component: FolieComponent, data: {url: backends[1]}},
  {path: 'kapitel/2/folie/3', component: FolieComponent, data: {url: backends[2]}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
