import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { ShopService } from '../service/shop.service';
import {IStoreProduct} from '../interfaces/storeproduct'
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;
  toggleBR: boolean = false;
  toggleSR: boolean = false;
  toggleRR: boolean = false;
  toggleTR: boolean = false;
  toggleBBR: boolean = false;
  


  currentPage:number = 1;
  itemsPerPage:number = 5;
  collectionSize:number = 0;
  startindex:number = 0;
  endindex:number = 5;
  priceRange= [ 0, 5000 ];
  priceMinValue: number = 0;
  priceMaxValue: number = 5000;
  public storePrdts:IStoreProduct[];
  public addToCartPrdt:IStoreProduct[];
  public errorMsg:any;

  constructor(private shopService: ShopService) { } 

  ngOnInit() {
    this.getStoreProducts();
    this.currentPage = 1;    
    this.startindex = 0;
    this.endindex = 5;
  }
  pageChange(e : any){
    //this.onChange(this.sortType);
    this.startindex = (e - 1) * this.itemsPerPage;
    this.endindex = this.itemsPerPage > -1 ? (this.startindex + this.itemsPerPage) : 5;
    //this.rows = this.allObjs.slice(start, end);
    window.scrollTo(0, 0);

}

toggleDisableMainMenu(){
  this.toggleBR = false;
  this.toggleSR = false;
  this.toggleRR = false;
  this.toggleTR = false;
  this.toggleBBR = false;
}

toggleDisableSubMenu(){

}

onShopCategoryClick(type){
  this.toggleDisableMainMenu();
  if(type === "BR"){
    this.toggleBR = true;
  }else if(type === "SR"){
    this.toggleSR = true;
  }else if(type === "RR"){
    this.toggleRR = true;
  }else if(type === "TR"){
    this.toggleTR = true;
  }else{
    this.toggleBBR = true;
  }
}

onChangePriceSlider(e : any){
  this.priceMinValue = e["0"];
  this.priceMaxValue = e["1"];
}

getStoreProducts(): void {
  this.shopService.getStoreProducts().subscribe(storePrdts  => {
    this.storePrdts = storePrdts;
    console.log(this.storePrdts);
    this.collectionSize = this.storePrdts.length;
  },error => {this.errorMsg = error});  
}

addToCart(item:IStoreProduct){
  console.log(item);
}

onShopCategorySubMenuClick(){

}

}
