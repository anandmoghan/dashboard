import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as firebase from 'firebase/app';
import 'firebase/auth';

import {AppService} from "./services/app.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'db-root',
  template: `
      <div *ngIf="!appLoader" fxLayout="column" fxFill>
          <router-outlet></router-outlet>
      </div>
      <div *ngIf="appLoader" fxLayout="column" fxLayoutAlign="center center" fxFill>
          <mat-progress-spinner [diameter]="80" mode="indeterminate"></mat-progress-spinner>
      </div>
  `
})

export class AppComponent implements OnInit {
  appLoader = true;

  constructor(private appService: AppService, private router: Router) {
    appService.getLoader().subscribe((value => {
      this.appLoader = value;
    }))
  }

  ngOnInit(): void {
    this.appService.addLoadComponent('firebase-auth')
    firebase.initializeApp(environment.firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

      } else {
        const redirectURL = this.router.url;
        if (!redirectURL.startsWith('/login')) {
          this.router.navigate([`login`], {queryParams: {'redirect': redirectURL}}).then();
        }
      }
      this.appService.removeLoadedComponent('firebase-auth')
    });
  }
}
