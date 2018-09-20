import { Component, OnInit } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  currentPage:number = 1;
  itemsPerPage:number = 5;
  collectionSize:number = 0;
  startindex:number = 0;
  endindex:number = 5;
  someRange= [ 2, 10 ];
  constructor() { }

  ngOnInit() {
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
}
