import { Injectable }       from '@angular/core';
import { Observable, of } from 'rxjs';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot}  from '@angular/router';
import { AuthenticationService }      from '../service/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private router: Router,private authService:AuthenticationService) {}

canActivate( next:  ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
     if (state.url === '/approval') {
            console.log('Approval navigation' +this.authService.isLoginSubject.value +' - ' + this.authService.isAdminSubject.value);
            return Observable.of(this.authService.isLoginSubject.value && this.authService.isAdminSubject.value);
    }

    return Observable.of(this.authService.isLoginSubject.value);
  }

}
