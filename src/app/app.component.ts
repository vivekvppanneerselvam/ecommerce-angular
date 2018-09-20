import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clicked:boolean = false;
  title = 'frontend';
  getClickEvent($event){
    this.clicked = $event;
  }
}
