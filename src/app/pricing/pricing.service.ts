import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  environment
} from '../../environments/environment';
import {
  NotificationService
} from '../core/services/notification.service';
import {
  switchMap,
  distinctUntilChanged,
  debounceTime
} from 'rxjs/operators';
import {
  EmptyObservable
} from 'rxjs/observable/EmptyObservable';

@Injectable()
export class PricingService {
    
    serverUrl = `${environment.baseUrl}${environment.baseParameter}`;
    url = `${environment.paymentUrl}`;

  constructor(private http: HttpClient, private notification: NotificationService, private dialog: MatDialog,private _router:Router) { }
  getPlansHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
      'LIC-Customer-ID': environment.customerID
    });

  }

  getOrderHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
      'LIC-Customer-ID': environment.customerID,
      'LIC-Consumer-ID': localStorage.getItem('clinicId')
    });
  }

  getPlans() {
      return this.http.get<any>(`${this.url}/subscription/read_plan`, {headers: this.getPlansHeader()});
  }

  createOrder(body) {
    return this.http.post<any>(`${this.url}/subscription/create_subscription`, body, {headers: this.getOrderHeader()});
  }

  callbackPayment(body) {
    return this.http.post<any>(`${this.url}/subscription/order_success_callback`, body, {headers: this.getOrderHeader()});
  }

  readSubscription() {
    return this.http.get<any>(`${this.url}/subscription/read_subscription`, {headers: this.getOrderHeader()});
  }
}
