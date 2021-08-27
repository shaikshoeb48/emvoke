import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { environment } from '../../environments/environment' ;

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  billingUrl = `${environment.billingUrl}` ;	

  constructor(private http: HttpClient) { }

  getInvoiceHeader(data){
    const token = localStorage.getItem('token') ;
  	return new HttpHeaders({
  		'Content-Type' : 'application/json',
  		'BIL-Payment-ID' : data.paymentId,
  		'BIL-Account-ID' : data.accountId,
  		'BIL-Payer-ID' : data.payerId,
      'BIL-Status-ID' : data.statusId,
      Authorization : `Bearer ${token}`
  	});
  }

  getPaymentModeHeader(){
    const token = localStorage.getItem('token') ;
  	return new HttpHeaders({
  		'Content-Type' : 'application/json',
      Authorization : `Bearer ${token}`,
      'BIL-Account-ID' : localStorage.getItem('clinicId')
  	}) ;
  }

  getStatusModeHeader(){
    const token = localStorage.getItem('token') ;
    return new HttpHeaders({
      'Content-Type' : 'application/json',
      Authorization : `Bearer ${token}`,
      'BIL-Account-ID' : localStorage.getItem('clinicId')
    }) ;
  }

  createInvoice(invoiceData, header){
  	const data = {
  		accountId : header.clinic_id,
  		paymentId : header.paymentId,
      payerId : header.patient_id,
      statusId : header.invoice_status
  	};
  	return this.http.post<any>(`${this.billingUrl}create_invoice`, invoiceData, {headers : this.getInvoiceHeader(data)}) ;
  }

  getPaymentModes(){
  	return this.http.get<any>(`${this.billingUrl}read_paymentMode`, {headers : this.getPaymentModeHeader()}) ;
  }

  getStatusModes(){
    return this.http.get<any>(`${this.billingUrl}read_status`, {headers : this.getStatusModeHeader()}) ;

  }

  getItemList(){
    return this.http.get<any>(`${this.billingUrl}read_item`, {headers : this.getStatusModeHeader()}) ;
  }
}
