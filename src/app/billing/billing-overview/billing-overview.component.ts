import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import * as echarts from 'echarts';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-billing-overview',
  templateUrl: './billing-overview.component.html',
  styleUrls: ['./billing-overview.component.scss']
})
export class BillingOverviewComponent implements OnInit {

  patientInvoices = [1,2,3,4,5];
  doctorsList = [1,2,3,4,5];
  isAdmin = false;
  accountExist = false;
  billingAccountForm : FormGroup;
  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('roles') === 'admin')
    this.isAdmin = true;
    this.billingAccountForm = new FormGroup({
      ownerName:new FormControl(''),
      gstNo: new FormControl(''),
      termsAndCondition: new FormControl(''),
      currency: new  FormControl('')
    })
  }

  submitForm(){
    console.log(this.billingAccountForm.value)
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



}
