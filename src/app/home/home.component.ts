import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  images = [1, 2, 3].map(() => `https://picsum.photos/1400/400?random&t=${Math.random()}`);
  constructor() { }

  ngOnInit() {
  }



}
