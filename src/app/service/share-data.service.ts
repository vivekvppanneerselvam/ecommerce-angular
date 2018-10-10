import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { IStoreProduct } from '../interfaces/storeproduct';

const _empty:IStoreProduct[] = [];
let i=1;
@Injectable()
export class ShareDataService {
    addToCartItems = new BehaviorSubject<IStoreProduct[]>(_empty);   
    subject = new BehaviorSubject<string>("First value");
         
    constructor(){}    
    
    updateAddToCartItems(cartItems:IStoreProduct[]){ 
      this.addToCartItems.next(cartItems);
    }  
    
    updateSubject(){
      i++;
      this.subject.next("Second value"+i);
    }

}