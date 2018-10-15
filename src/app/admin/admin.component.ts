import { Component, OnInit } from '@angular/core';
import {EditProductRenderer} from '../ag-grid-cell-renderer/edit-product-renderer.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private frameworkComponents;
  constructor() {  this.frameworkComponents = {editProductRenderer: EditProductRenderer} }
  ngOnInit() {
  }
  orderColumnDefs =[{ headerName: 'Order No', field: 'orderNum',  filter: 'agTextColumnFilter',  width: 150},
  { headerName: 'Customer Id', field: 'customerId',  width: 150 },
  { headerName: 'Ship Amount', field: 'shipAmt' ,  width: 150},
  { headerName: 'Ship Method', field: 'shipMethod',  width: 150 },
  { headerName: 'Payment Type', field: 'paymentType',  width: 100 },
  { headerName: 'Order Created Date', field: 'orderCreateTimeStamp',  width: 150 },
  { headerName: 'Order Updated Date', field: 'orderUpdateTimeStamp',  width: 150 }
  ];
  orderRowData =[{ orderNum: 'Toyota', customerId: 'dsfa', shipAmt: 35000 , shipMethod: 'dsfa',  paymentType: 'dsfa', 
  orderCreateTimeStamp: 'dsfa',  orderUpdateTimeStamp: 'dsfa'}];

  prdtColumnDefs = [
    { headerName: 'Id', field: 'productId',  filter: 'agTextColumnFilter',  width: 75},
    { headerName: 'Product Name', field: 'productTitle',  width: 150 },
    { headerName: 'Category', field: 'productMainCategory' ,  width: 150},
    { headerName: 'Sub-Category', field: 'productSubCategory',  width: 150 },
    { headerName: 'Price', field: 'productPrice',  width: 100 },
    { headerName: 'Discount', field: 'productDiscount',  width: 150 },
    { headerName: 'Weight', field: 'productWeight',  width: 150 },
    { headerName: 'Status', field: 'productStatus',  width: 100 },
    { headerName: 'Edit',field: 'edit', width: 75, cellRenderer: "editProductRenderer"}
  ];

  prdtRowData = [
    { productId: 'Toyota', productTitle: 'dsfa', productMainCategory: 35000 , productSubCategory: 'dsfa',  productPrice: 'dsfa', 
      productDiscount: 'dsfa',  productWeight: 'dsfa', productStatus:''},
  ];

}
