import { Injectable } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { TransactionList } from './transaction-list/transaction-list.model';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http: HttpClient) {
  }
  billingServiceUrl = `${environment.billingUrl}`;

  //billingAccountDetails



  createBillingAccount(data) {

    return this.http.post<any>(`${this.billingServiceUrl}create_account`, data, { headers: this.getAccountCreateHeaders() })
  }

  getAccountDetails() {

    return this.http.get<any>(`${this.billingServiceUrl}read_account`, { headers: this.getAccountReadHeaders() }).pipe(shareReplay(1));
  }

  updateBillingAccount(data) {
    return this.http.put<any>(`${this.billingServiceUrl}update_account`, data,{ headers: this.getAccountUpdateHeaders() });

  }

  getAccountCreateHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type' : 'application/json',
      Authorization: `Bearer ${token}`,
      'BIL-Account-ID': localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : 'temp'
    })
  }

  getAccountReadHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'BIL-Account-ID': localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : 'temp'
    })
  }

  getAccountUpdateHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'BIL-Account-ID': localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : 'temp'
    })
  }


  /* For invoice template(add-billing component) */

  //return list of item from DB
  getItems() {
    return this.http.get<any>(`${this.billingServiceUrl}read_item`, { headers: this.getItemReadHeaders() });
  }

  //add new item to items list DB
  createItem(data, categoryId) {
    return this.http.post<any>(`${this.billingServiceUrl}create_item`, data, { headers: this.getItemCreateHeaders(categoryId) });
  }

  //update item to DB
  updateItem(data, itemId) {
    return this.http.put<any>(`${this.billingServiceUrl}update_item`, data, { headers: this.getItemUpdateHeaders(itemId) });

  }

  //delete item from DB
  deleteItem(id) {

    return this.http.delete<any>(`${this.billingServiceUrl}delete_item?`, { headers: this.getItemDeleteHeaders(id) })
  }

  getItemCategory() {
    return this.http.get<any>(`${this.billingServiceUrl}read_itemCategory`, { headers: this.getItemCategoryReadHeaders() });

  }

  getItemCreateHeaders(categoryId) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'BIL-Category-ID': categoryId,
      'BIL-Account-ID': localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : 'temp',
      Authorization: `Bearer ${token}`

    })
  }

  getItemReadHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'BIL-Account-ID': localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : 'temp',
      Authorization: `Bearer ${token}`

    })
  }

  getItemUpdateHeaders(itemId) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'BIL-Item-ID': itemId,
      'BIL-Account-ID': localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : 'temp',
      Authorization: `Bearer ${token}`

    })
  }

  getItemDeleteHeaders(itemId) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'BIL-Item-ID': itemId,
      'BIL-Account-ID': localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : 'temp',
      Authorization: `Bearer ${token}`

    })
  }

  getItemCategoryReadHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'BIL-Account-ID': localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : 'temp',
      Authorization: `Bearer ${token}`

    })
  }


  /* For TransactionList component*/
  getTransactionHistoryOnDate(date) {
    return this.http.get<any>(`${this.billingServiceUrl}read_invoice`, { headers: this.transactionReadByDateHeaders(date) });

  }

  getTransactionHistoryOnPatientName(id) {
    return this.http.get<any>(`${this.billingServiceUrl}read_invoice`, { headers: this.transactionReadByIdHeaders(id) });

  }

  getPaymentModeList() {
    return this.http.get<any>(`${this.billingServiceUrl}read_paymentMode`, { headers: this.getPaymentModeHeaders() });

  }

  getStatusList() {
    return this.http.get<any>(`${this.billingServiceUrl}read_status`, { headers: this.getStatusHeaders() });

  }


  transactionReadByDateHeaders(date) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'BIL-Account-ID': localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : "c1592793-55b4-42d7-894c-45f7759247e7",
      'BIL-Date': date,
      Authorization: `Bearer ${token}`
    })
  }

  transactionReadByIdHeaders(id) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'BIL-Account-ID': localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : "temp",
      'BIL-Payer-ID': id,
      Authorization: `Bearer ${token}`
    })
  }

  getPaymentModeHeaders() {
    const token = localStorage.getItem('token')
    return new HttpHeaders({
      'BIL-Account-ID': localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : "temp",
      Authorization: `Bearer ${token}`
    })
  }

  getStatusHeaders() {
    const token = localStorage.getItem('token')
    return new HttpHeaders({
      'BIL-Account-ID': localStorage.getItem('clinicId') ? localStorage.getItem('clinicId') : "temp",
      Authorization: `Bearer ${token}`
    })
  }



  //export list of item as csv
  exportData(data) {
    console.log(data)
    data = data.map((x) => {
      return { 'itemHSNCode': x.itemHSNCode, 'itemCategory': x.itemCategory, 'itemName': x.itemName, 'itemRate': x.itemRate, 'itemGSTAmount': x.itemGSTAmount, 'itemCESS': x.itemCESS }
    })
    let jsonObject = JSON.stringify(data)

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: false,
      showTitle: false,
      title: 'billingTemplateData',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(jsonObject);
  }
}
