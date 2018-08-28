import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit-us',
  templateUrl: './visit-us.component.html',
  styleUrls: ['./visit-us.component.css']
})
export class VisitUsComponent implements OnInit {
  lat: number = 13.062024;
  lng: number = 80.27267299999994;
  constructor() { }

  ngOnInit() {
  }

}
