import { Component, OnInit } from '@angular/core';
import {IStoreProduct} from '../interfaces/storeproduct';
import { Router } from '@angular/router';
import {ShareDataService} from '../service/share-data.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
  
})

export class ViewCartComponent{
  cartItem: number =1;
  addToCartItems:IStoreProduct[] = [];  
  
  constructor(private shareDataService: ShareDataService, private router: Router) { }

  ngOnInit() {
    this.shareDataService.addToCartItems.asObservable().subscribe((data) => {
      this.addToCartItems = data;      
    });   
    
  }

  _keyPress(event: any) {
    const pattern = /[1-9\+\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
}

goToShopPage(){
  this.router.navigateByUrl('/shop');
}

updateCart(){
  
}

goToCheckOut(){
  this.router.navigateByUrl('/checkout');
}



}
