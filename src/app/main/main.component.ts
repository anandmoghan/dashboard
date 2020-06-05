import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'db-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  host: {class: 'router-container'}
})
export class MainComponent implements OnInit {
  tabsList = [{
    name: 'Overview',
    url: '/'
  }, {
    name: 'History',
    url: '/history'
  }, {
    name: 'Notes',
    url: '/notes'
  }, {
    name: 'Logs',
    url: '/logs'
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
