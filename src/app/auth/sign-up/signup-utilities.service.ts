import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupUtilitiesService {

  constructor() { }
  private signupobj;
  
  setobj(obj:any){
   this.signupobj=obj;
  }

  getobj():any{
    return this.signupobj;
  }
}
