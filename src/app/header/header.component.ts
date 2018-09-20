import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  clicked:boolean = false;
  constructor() { }

  ngOnInit() {  }

  showMobileMenu(){
    this.clicked = ! this.clicked;
  }
      
  focusOut(){
    this.clicked = ! this.clicked;
    alert("asdf");
  }

}
