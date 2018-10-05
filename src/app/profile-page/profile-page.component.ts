import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  addressSectionFlg:boolean = false;
  orderSectionFlg:boolean = true;
  profileSectionFlg:boolean = false;
  wishlistSectionFlg:boolean = false;
  ticketSectionFlg:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleProfileView(value){
    this.addressSectionFlg = false;
    this.orderSectionFlg = false;
    this.profileSectionFlg = false;
    this.wishlistSectionFlg = false;
    this.ticketSectionFlg = false;
    if(value === "order"){
      this.orderSectionFlg = true;
    }else if(value === "profile"){
      this.profileSectionFlg = true;
    }else if(value === "address"){
      this.addressSectionFlg = true;
    }else if(value === "wishlist"){
      this.wishlistSectionFlg = true;
    }else{
      this.ticketSectionFlg = true;
    }
  }

}
