import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  addressFlg:boolean = true;
  paymentFlg:boolean = false;
  shippingFlg:boolean = false;
  reviewFlg:boolean = false;
  orderConfirmFlg:boolean = false;

  constructor() { }

  ngOnInit() {
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
}
