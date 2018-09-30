import { Injectable, Output, EventEmitter} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {Headers, RequestOptions, URLSearchParams}  from '@angular/http';
import {Observable,BehaviorSubject}               from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthenticationService {
  url ="/authenticate";
  constructor (private http: Http, private router: Router) {
  }
  credentials :  any;

  isAdminSubject = new BehaviorSubject<boolean>(this.hasAdmin());
  isAdmin() : Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
  public login(username: any, password: any) {
    let params  = new URLSearchParams();
    this.credentials = {username : username, password : password};
    params.append('username', username);
    params.append('password', password);
    let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa("username:secret")});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, params.toString(), options).map((response: Response) => {
    if (response) {
      localStorage.setItem('currentUser',JSON.stringify(response.json()));
      this.isLoginSubject.next(true);
      this.isAdminSubject.next(response.json().admin);
    } else {
    this.isLoginSubject.next(false);
    }
    }).catch(this.handleErrorObservable);
  }

  logout(){

    this.http.get("/logout")
              .subscribe ((data: Response) => {
                localStorage.removeItem('currentUser');
                this.isLoginSubject.next(false);
                this.isAdminSubject.next(false);
              });
  }

  private extractData(res: Response){
    return res;
  }

  private handleErrorObservable(error: Response | any){
    return Observable.throw(error);
  }

  private hasToken() : boolean {
    return !!localStorage.getItem('currentUser');
  }

  private hasAdmin() : boolean {
    let token = localStorage.getItem('currentUser');
    if(token){
      return (JSON.parse(token)).admin;
    }
    return false;
  }

}
