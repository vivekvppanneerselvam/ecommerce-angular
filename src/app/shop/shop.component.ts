import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { ShopService } from '../service/shop.service';
import {IStoreProduct} from '../interfaces/storeproduct'
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers:[ToasterService]
})
export class ShopComponent implements OnInit {
  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;
  toggleBR: boolean = false;
  toggleSR: boolean = false;
  toggleRR: boolean = false;
  toggleTR: boolean = false;
  toggleBBR: boolean = false;
  toggleOR: boolean = false;

  toggleSubBRSMR: boolean = false;
  toggleSubBRBPT: boolean = false;
  toggleSubSRSMR: boolean = false;
  toggleSubSRBPT: boolean = false;
  toggleSubRRSMR: boolean = false;
  toggleSubRRWPRR: boolean = false;
  toggleSubTRIR: boolean = false;
  toggleSubTRIRRR: boolean = false;
  toggleSubBBRBR: boolean = false;
  toggleSubBBRSSR: boolean = false;
  toggleSubBBROR: boolean = false;
  sIndex: number = null;
  
  
  currentPage:number = 1;
  itemsPerPage:number = 5;
  collectionSize:number = 0;
  startindex:number = 0;
  endindex:number = 5;
  priceRange= [ 0, 5000 ];
  priceMinValue: number = 0;
  priceMaxValue: number = 5000;
  public storeProducts:IStoreProduct[];
  public addToCartPrdt:IStoreProduct[];
  public errorMsg:any;
  public products:IStoreProduct[];
  selectedMainCategory:string = "";
  selectedSubCategory:string = "";

  cartItems:IStoreProduct[];

  constructor(private shopService: ShopService, private toasterService: ToasterService) { } 

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
  this.toggleSubBRSMR = false;
  this.toggleSubBRBPT = false;
  this.toggleSubSRSMR = false;
  this.toggleSubSRBPT = false;
  this.toggleSubRRSMR = false;
  this.toggleSubRRWPRR = false;
  this.toggleSubTRIR = false;
  this.toggleSubTRIRRR = false;
  this.toggleSubBBRBR = false;
  this.toggleSubBBRSSR = false;
  this.toggleSubBBROR = false;
}

onShopCategoryClick(type){
  this.selectedMainCategory = "";
  this.toggleDisableMainMenu();  
  if(type === "BR"){
    this.selectedMainCategory = "Boild Rice";
    this.toggleBR = true;
  }else if(type === "SR"){
    this.selectedMainCategory = "Steam Rice";
    this.toggleSR = true;
    
  }else if(type === "RR"){
    this.selectedMainCategory = "Raw Rice";
    this.toggleRR = true;
  }else if(type === "TR"){
    this.selectedMainCategory = "Tiffen Rice";
    this.toggleTR = true;
  }else{
    this.selectedMainCategory = "Briyani Rice";
    this.toggleBBR = true;
  }
  this.onFilterStoreProductsByCategory();
}

onChangePriceSlider(e : any){
  this.priceMinValue = e["0"];
  this.priceMaxValue = e["1"];
}

getStoreProducts(): void {
  this.shopService.getStoreProducts().subscribe(storeProducts  => {
    this.storeProducts = storeProducts;
    this.products = this.storeProducts;
    console.log(this.storeProducts);
    console.log(this.products.map(item => item.productTitle).filter((value, index, self) => self.indexOf(value) === index));
    this.collectionSize = this.storeProducts.length;
  },error => {this.errorMsg = error});  
}

hasDuplicateItem(collection) {
  var groups = collection.reduce((acc, cur) => {
    acc[cur.description] = (acc[cur.description] || 0) + 1;
    return acc;
  }, {});

  return Object.values(groups).some(num => num > 1);
}

addToCart(item:IStoreProduct){
  console.log(item);
  this.cartItems.push(item);
  if(!this.hasDuplicateItem(item)){
    this.cartItems.push(item);
    this.toasterService.pop('success', '', '<h1>adsf<h1>');
  }else{
    this.toasterService.pop('error', '', '<h1>adsf<h1>'); 
  }
 
}

onFilterStoreProductsByCategory(){
  if(this.selectedMainCategory !== ""){
   this.products = this.storeProducts.filter(entity =>entity.productMainCategory.includes(this.selectedMainCategory));    
  }
  if(this.selectedSubCategory !== ""){
    this.products = this.products.filter(entity =>entity.productSubCategory.includes(this.selectedSubCategory));    
  }
   this.collectionSize = this.products.length;
}

onFilterStoreProductsByPriceRange(){
  this.products = this.storeProducts.filter(entity => {    
      return entity.productPrice >= this.priceMinValue;    
  });
  
  this.collectionSize = this.products.length;
}

onShopCategorySubMenuClick(type){
  this.selectedSubCategory = "";
  this.toggleDisableSubMenu();
  if(type === "BR-SMRice"){
    this.selectedSubCategory = "Sona Masoori Rice";
    this.toggleSubBRSMR = true; 
  }else if(type === "BR-BPTRice"){
    this.selectedSubCategory = "BPT Rice";
    this.toggleSubBRBPT = true;
  }else if(type === "SR-SMRice"){
    this.selectedSubCategory = "Sona Masoori Rice";
    this.toggleSubSRSMR = true;
  }else if(type === "SR-BPTRice"){
    this.selectedSubCategory = "BPT Rice";
    this.toggleSubSRBPT = true;
  }else if(type === "RR-SMRice"){
    this.selectedSubCategory = "Sona Masoori Rice";
    this.toggleSubRRSMR = true;
  }else if(type === "RR-WPRawRice"){
    this.selectedSubCategory = "White Ponni Raw Rice";
    this.toggleSubRRWPRR = true;
  }else if(type === "Idly Rice"){
    this.selectedSubCategory = type;
    this.toggleSubTRIR = true;
  }else if(type === "IR Raagam Rice"){
    this.toggleSubTRIRRR = true;
    this.selectedSubCategory = type;
  }else if(type === "Basmati Rice"){
    this.toggleSubBBRBR = true; 
    this.selectedSubCategory = type; 
  }else if(type === "Seeraga Samba Rice"){
    this.toggleSubBBRSSR = true;
    this.selectedSubCategory = type;
  }else if(type === "Other Basmati Brands"){
    this.toggleSubBBROR = true;
    this.selectedSubCategory = type;
  }else{
    this.toggleOR = true;
  }
  this.onFilterStoreProductsByCategory();
}



popToast() {
  this.toasterService.pop('error', '', 'Args Body');
}
setIndex(prdt) {
  prdt.active = !prdt.active;
}

}
