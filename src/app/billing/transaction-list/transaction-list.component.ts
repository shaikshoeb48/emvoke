import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TransactionList } from './transaction-list.model';
import { FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';

import { DatePipe } from '@angular/common';
import { BillingService } from '../billing.service';
import { PatientService } from 'src/app/patient/patient.service';
import { Subject, forkJoin, Subscription } from 'rxjs';
import { ShareService } from 'src/app/share.service';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { Router } from '@angular/router';
const moment = _moment;

export const DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ]
})
export class TransactionListComponent implements OnInit, OnDestroy {
  searchTerm$ = new Subject<string>();
  searchResults: any;
  transactionDate = new FormControl(moment());
  patientSearch = false;
  searchText: string;
  singlePatientData: string;
  transactions: TransactionList[] = []
  page: string;
  paymentModeList = {}
  doctorList = {}
  statusList = {}
  billingAccountDataSub: Subscription = Subscription.EMPTY;
  billingAccountDataExist = false;

  constructor(private datepipe: DatePipe,
    private billingService: BillingService,
    private patientService: PatientService,
    private shareService: ShareService,
    private router :Router) {

    //searches patient by name with phone no similar to patientsearch component
    if (this.searchTerm$) {
      this.patientService.searchPatient(this.searchTerm$)
        .subscribe(results => {
          if (results.Data) {
            const patientDet = JSON.parse(atob(results.Data));
            this.searchResults = patientDet;
          } else {
            this.searchResults = '';
          }
        }, (error) => {
          console.log('Get patient details error', error);
        });
    } else {
      this.searchResults = null;
    }
  }

  ngOnInit() {

    this.checkBillingAccount();
    this.getPaymentModesAndStatus();
  }


  checkBillingAccount() {
    this.billingService.getAccountDetails().subscribe((result) => {
      const rawData = atob(result.Data)
      if (rawData.length) {
        const account = JSON.parse(rawData)
        const accountDetails = account.account_details
        console.log(accountDetails)
        if (Object.keys(accountDetails).length) {
          this.billingAccountDataExist = true;
        }
      }
    },
      (err) => {
        console.log("No account found")
        this.billingAccountDataExist = false;
      });

  }


  redirectToAccountDetails(){
    this.router.navigate(['/billing/addbilling'])
  }

  chartOption1: EChartOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1430, 1550, 1200, 1650.1450, 1680.1890],
      type: 'line',
      areaStyle: {}
    }]
  }


  chartOption2: EChartOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }]
  }


  //get list of payment mode to map with payment id
  getPaymentModesAndStatus() {

    forkJoin({ paymentMode: this.billingService.getPaymentModeList(), status: this.billingService.getStatusList() }).subscribe(({ paymentMode, status }) => {
      if (paymentMode.Data) {
        const rawData = atob(paymentMode.Data);
        if (rawData.length) {
          const paymentData = JSON.parse(rawData);
          for (let payment of paymentData) {
            this.paymentModeList[payment._id] = payment.payment_mode
          }
        }
      }
      if (status.Data) {
        const rawData = atob(status.Data);
        if (rawData.length) {
          const paymentStatusData = JSON.parse(rawData);
          for (let status of paymentStatusData) {
            this.statusList[status._id] = status.status
          }

        }
      }
      this.getDoctorList();
    })
  }

  //get list of doctors to map with doctor id
  getDoctorList() {
    this.shareService.clinicData.subscribe((result) => {
      if (Object.keys(result).length) {
        result.doctors.forEach((doc) => {
          this.doctorList[doc.doctor_id] = doc.doctor_name;
        })
        this.getDataOnDateChange();

      }
    })
  }


  onPatientCompleteSearchChecked() {
    this.patientSearch = !this.patientSearch
    if (this.patientSearch) {
      this.transactionDate.disable();
    }
    if (!this.patientSearch) {
      this.transactionDate.enable();
      this.getDataOnDateChange();
    }
  }


  //get complete tranaction list of patient
  getPatientTransactionDetails(result) {
    this.singlePatientData = result;
    this.transactions = []
    console.log(this.singlePatientData)
    /*Integrate -> using patient id get customer billing id */

    let tempPatId = this.singlePatientData["_id"]
    console.log(tempPatId)
    this.searchResults = ""

    this.billingService.getTransactionHistoryOnPatientName(tempPatId).subscribe((result) => {
      const rawData = atob(result.Data);
      if (rawData.length) {
        let invoiceList = JSON.parse(rawData)
        invoiceList.forEach((t) => {
          const invoiceDetails = t.invoice_details
          const payerDetails = t.payer_details;
          let invoiceNumber = t.invoice_number;
          let patientName = payerDetails.name;
          let docName = this.doctorList[payerDetails.doctor_id]
          let totAmt = invoiceDetails.total_amount
          let status = this.statusList[t.status]
          let paymentType = this.paymentModeList[t.payment_id]
          let date = t.invoice_date
          let phoneNum = payerDetails.contact_details[0].country_code + " " + payerDetails.contact_details[0].phone_number;
          let singleTransaction = new TransactionList(invoiceNumber, patientName, docName, totAmt, status, paymentType, phoneNum, date)
          this.transactions.push(singleTransaction)
        })

      }


    })

  }


  //get transaction list based on date
  getDataOnDateChange() {
    this.searchText = ""
    this.transactions = []
    let currentDate = this.datepipe.transform(this.transactionDate.value, 'yyyy-MM-dd')
    console.log(currentDate, this.transactionDate.value)
    this.billingService.getTransactionHistoryOnDate(currentDate).subscribe((result) => {
      const rawData = atob(result.Data);
      if (rawData.length) {
        let invoiceList = JSON.parse(rawData)
        console.log(invoiceList)
        invoiceList.forEach((t) => {
          const invoiceDetails = t.invoice_details
          const payerDetails = t.payer_details;
          let invoiceNumber = t.invoice_number;
          let patientName = payerDetails.name;
          let docName = this.doctorList[payerDetails.doctor_id]
          let totAmt = invoiceDetails.total_amount
          let status = this.statusList[t.status]
          let paymentType = this.paymentModeList[t.payment_id]
          let date = this.datepipe.transform(t.invoice_date, "dd-MM-yyyy");
          let phoneNum = payerDetails.contact_details[0].country_code + " " + payerDetails.contact_details[0].phone_number;
          let singleTransaction = new TransactionList(invoiceNumber, patientName, docName, totAmt, status, paymentType, phoneNum, date)
          console.log(t)
          this.transactions.push(singleTransaction)
        })

      }
    })
  }

  ngOnDestroy() {
    this.billingAccountDataSub.unsubscribe();
  }

}
