import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }
  columnDefs = [
    { headerName: 'Product Id', field: 'productId' },
    { headerName: 'Product Name', field: 'productTitle' },
    { headerName: 'Category', field: 'productMainCategory' },
    { headerName: 'Sub-Category', field: 'productSubCategory' },
    { headerName: 'Product Price', field: 'productPrice' },
    { headerName: 'Product Discount', field: 'productDiscount' },
    { headerName: 'Product Weight', field: 'productWeight' },
    { headerName: 'Product Status', field: 'productStatus' }   
  ];

  rowData = [
    { productId: 'Toyota', productTitle: 'dsfa', productMainCategory: 35000 , productSubCategory: 'dsfa',  productPrice: 'dsfa', 
      productDiscount: 'dsfa',  productWeight: 'dsfa', productStatus:''},
  ];

}
