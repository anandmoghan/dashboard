import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HistoryComponent} from "./history/history.component";
import {LoginComponent} from "./login/login.component";
import {LogsComponent} from "./logs/logs.component";
import {MainComponent} from "./main/main.component";
import {NotesComponent} from "./notes/notes.component";
import {OverviewComponent} from "./overview/overview.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', component: OverviewComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'logs', component: LogsComponent},
      {path: 'notes', component: NotesComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
