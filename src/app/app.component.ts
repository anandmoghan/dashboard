import {Component} from '@angular/core';

import {AppService} from "./services/app.service";

@Component({
  selector: 'db-root',
  template: `
      <div *ngIf="!appLoader" fxLayout="column" fxFill>
          <router-outlet></router-outlet>
          Hello World! Dashboard will be online soon.
      </div>
      <div *ngIf="appLoader" class="content-container" fxLayout="column" fxLayoutAlign="center center" fxFill>
          <mat-progress-spinner [diameter]="80" mode="indeterminate"></mat-progress-spinner>
      </div>
  `
})

export class AppComponent {
  appLoader = true;

  constructor(appService: AppService) {
    appService.getLoader().subscribe((value => {
      this.appLoader = value;
    }))
  }
}
