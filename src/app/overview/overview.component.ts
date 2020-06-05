import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'db-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less'],
  host: {class: 'router-container'}
})
export class OverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
