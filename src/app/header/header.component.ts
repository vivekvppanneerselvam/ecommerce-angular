import { Component,  Output, EventEmitter } from '@angular/core';
import { ClickOutsideDirective } from './../directives/click-outside.directive';
import {IStoreProduct} from '../interfaces/storeproduct';
import { Router } from '@angular/router';
import {ShareDataService} from '../service/share-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})
export class HeaderComponent {
  clicked:boolean = false;
  clickedOutsideNav: boolean = true;
  addToCartItems:IStoreProduct[] = [];  
  cartLength:number = 0;
  subTotal:number =0;
  @Output() offCanvasClickEvent = new EventEmitter<boolean>();

  constructor(private router: Router, private shareDataService: ShareDataService) { }

  ngOnInit() {    
    this.shareDataService.addToCartItems.asObservable().subscribe((data) => {
      this.addToCartItems = data;
      this.cartLength = this.addToCartItems.length;
      this.subTotal = 0;
      for( var i=0; i < this.addToCartItems.length; i++){
        this.subTotal =  this.subTotal + this.addToCartItems[i].productPrice;
      }      
    });
  }

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

  gotoLoginRegPage= function () {
    this.router.navigateByUrl('/login');
  };

  

  onClickViewCart(){
    this.router.navigateByUrl('/view-cart');
  }

  onClickCheckout(){
    this.router.navigateByUrl('/checkout');
  }
  
}
