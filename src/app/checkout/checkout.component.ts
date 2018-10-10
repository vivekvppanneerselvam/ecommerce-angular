import { Component, OnInit } from '@angular/core';
import {ShareDataService} from '../service/share-data.service';
import {IStoreProduct} from '../interfaces/storeproduct';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent{
  addressFlg:boolean = true;
  paymentFlg:boolean = false;
  shippingFlg:boolean = false;
  reviewFlg:boolean = false;
  orderConfirmFlg:boolean = false;
  addToCartItems:IStoreProduct[] = [];  
  subTotal:number = 0;
  cartItem = 1;
  
  constructor(private shareDataService : ShareDataService) { }

  ngOnInit() {
    this.shareDataService.addToCartItems.asObservable().subscribe((data) => {
      this.addToCartItems = data;
      this.subTotal = 0;
      for( var i=0; i < this.addToCartItems.length; i++){
        this.subTotal =  this.subTotal + this.addToCartItems[i].productPrice;
      }      
    });
  }

  toggleCheckout(value){
    this.addressFlg = false;
    this.paymentFlg = false;
    this.shippingFlg = false;
    this.reviewFlg = false;
    if(value === "address"){
      this.addressFlg = true;
    }else if(value === 'shipping'){
      this.shippingFlg = true;
    }else if(value === 'payment'){
      this.paymentFlg = true;
    }else{
      this.reviewFlg = true;
    }
  }

  _keyPress(event: any) {
    const pattern = /[1-9\+\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
