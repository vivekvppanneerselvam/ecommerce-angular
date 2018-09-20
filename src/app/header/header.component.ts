import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { ClickOutsideDirective } from './../directives/click-outside.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
 
})
export class HeaderComponent implements OnInit {
  clicked:boolean = false;
  @Output() offCanvasClickEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {  }

  showMobileMenu(){
    this.clicked = ! this.clicked;
    this.offCanvasClickEvent.emit(this.clicked);
  }

  clickOutside(){
    this.clicked = false;
  }
  
}
