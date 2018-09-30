import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { ClickOutsideDirective } from './../directives/click-outside.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent implements OnInit {
  clicked:boolean = false;
  clickedOutsideNav: boolean = true;
  @Output() offCanvasClickEvent = new EventEmitter<boolean>();
  constructor(private router: Router) { }

  ngOnInit() {  }

  showMobileMenu(){
    this.clicked = ! this.clicked;
    this.offCanvasClickEvent.emit(this.clicked);
  }

  clickOutside(){
    this.clickedOutsideNav = !this.clickedOutsideNav;
    if(this.clicked && !this.clickedOutsideNav){
      this.clickedOutsideNav = false;
      this.clicked = false;
      this.offCanvasClickEvent.emit(this.clicked);
    }else{
      this.clickedOutsideNav = true;
    }
    
  }


  onShopClick= function () {
    this.router.navigateByUrl('/shop');
  };
  
}
