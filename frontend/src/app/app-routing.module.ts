import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KapitelstartComponent} from "./kapitelstart/kapitelstart.component";
import {TeaserComponent} from "./teaser/teaser.component";
import {FolieComponent} from "./folie/folie.component";
import {AgendaComponent} from "./agenda/agenda.component";

const routes: Routes = [
  {path: '', redirectTo: '/kapitel/1/folie/1', pathMatch: 'full'},
  {path: 'kapitel/1/folie/2', component: TeaserComponent},
  {path: 'kapitel/1/folie/3', component: AgendaComponent},
  {path: 'kapitel/:kapitelId/folie/1', component: KapitelstartComponent},
  {path: 'kapitel/:kapitelId/folie/:folienId', component: FolieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
