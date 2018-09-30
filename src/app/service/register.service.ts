import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions}  from '@angular/http';
import {Observable}               from 'rxjs';

@Injectable()
export class RegisterService {
  constructor (private http: Http) {}

addRegistrationFormDetails(formdata: any): Observable<any> {
  console.log("JSON.stringify(formdata)"+JSON.stringify(formdata));
  var body = JSON.stringify(formdata);
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({headers : headers});
            return this.http.post('/fleetvansftl/register/createuser', formdata, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);

  }

  checkEmail(emailAddress : any) : Observable<any> {
    return this.http.get('/fleetvansftl/register/emailExist'+"?emailAddress="+emailAddress)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }



  usernameExist(username : any) : Observable<any> {
    return this.http.get('/fleetvansftl/register/usernameExist'+"?username="+username)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }



  private extractData(res: Response){
    return res;
  }

  private handleErrorObservable(error: Response | any){
    return Observable.throw(error);
  }

}
