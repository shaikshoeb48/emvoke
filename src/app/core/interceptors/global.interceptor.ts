import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  whiteListedForIntercept: Array<string>;
  constructor() {
      this.whiteListedForIntercept= [
        environment.baseUrl,
        environment.reportsUrl
      ];
    }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clinicId = localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : 'temp';
    const role = localStorage.getItem('roles') ? localStorage.getItem('roles') : 'temp' ;
    if (this.isValidRequestForInterceptor(req.url)) {
      let modifiedRequest = req.clone({
        headers: req.headers.set('X-Clinic-ID', clinicId),
      });
      modifiedRequest = modifiedRequest.clone({
        headers: modifiedRequest.headers.set('X-Request-Origin', role),
      })
      return next.handle(modifiedRequest);
    }
    return next.handle(req);

  }


  private isValidRequestForInterceptor(requestUrl: string): boolean {
    if(this.whiteListedForIntercept.length){
      let allowedRegexStr = this.whiteListedForIntercept.join('|').replace(/\./g, '\\.');
      const regEx = new RegExp(allowedRegexStr)
      let destination: string = requestUrl
      if(regEx.test(destination)){
        return true
      }
    }
    return false

  }

}
