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
  totalPrice : number = 0;  
  
  constructor(private shareDataService: ShareDataService, private router: Router) { }

  ngOnInit() {
    this.shareDataService.addToCartItems.asObservable().subscribe((data) => {
      this.addToCartItems = data;      
    });   
    
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
}

increase_quantity(_product){
  if(_product.productQuantity >= 50){
    _product.productQuantity = 50;
    return alert("Can't add more")
  }else{
    _product.productQuantity++
    this.totalPrice += _product.productPrice;
  }
}

decrease_quantity(_product){
    if(_product.productQuantity == 1){      
      return alert("can't be in minus")
    }
    _product.productQuantity--
    this.totalPrice -= _product.productPrice;
}

countPrice(){
   this.totalPrice = 0;
    for(let p of this.addToCartItems){
      this.totalPrice += p.productPrice*p.productQuantity;
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
