import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {IStoreProduct} from '../interfaces/storeproduct'
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  _url = '../../assets/json/shop.json';
  constructor(private http: HttpClient) { }

  getStoreProducts() :Observable<IStoreProduct[]>{
    return this.http.get<IStoreProduct[]>(this._url)
    .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }
}
