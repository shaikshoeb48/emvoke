import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router' ;
import { ShareService } from '../../share.service' ;
import { DatePipe } from '@angular/common' ;
import { PrescriptionService } from '../prescription.service' ;
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode' ;
import { InvoiceService } from '../invoice.service' ;
import { AppointmentService } from '../../appointment/appointment.service' ;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  @ViewChild('serviceSelect') serviceSelect ;
  date ; 
  patientData ;
  invoiceStatus ;
  appointmentId = localStorage.getItem('appointment_id') ? localStorage.getItem('appointment_id') : 'temp' ;
  URL = 'www.emvoke.com/invoice/' ;
  originURL = window.location.origin ;
  clinicData ;	
  doctorName = localStorage.getItem('doctorName') ;
  doctorData ;
  invoice ;
  editIndex = -1 ;
 //  services = [
 //  		{ name : 'Imaging', GST : 18 , rate: 830} ,
 //  		{ name : 'Lab' , GST : 5 , rate : 1000} ,
 //  		{ name : 'Vaccine', GST : 5, rate: 500},
 //  		{ name : 'Medication', GST: 18 , rate : 100} ,
 //  		{ name : 'Investigation', GST: 18, rate: 235.50},
 //  		{ name : 'Consulting', GST: 5, rate : 300},
 //  		{ name : 'Custom', GST : 18, rate: 910 }
	// ] ;
  services = [] ;

  GSTBreakout = {}
  statusList = [] ;
  addedServices = [] ;	
  
  paymentMode = 0 ;
  paymentModeList = [] ;

  totalAmount = 0;
  netAmount = 0 ;
  totalGST = 18 ;
  totalDiscount = 0 ; 
  roundoffDeduction: any = 0.0 ;
  qrCode = {
  	elementType : NgxQrcodeElementTypes.URL,
  	correctionLevel : NgxQrcodeErrorCorrectionLevels.HIGH,
  	value : `${this.URL}${this.appointmentId}` 
  }

  constructor(private shareService: ShareService, private router: Router, private prescriptionService: PrescriptionService,
   private datePipe: DatePipe, private invoiceService: InvoiceService, private appointmentService: AppointmentService) { }

  ngOnInit() {

  	this.date = this.datePipe.transform(new Date(), 'dd-MM-yyyy') ;
    this.prescriptionService.patientDataVal.subscribe(data => {

      if(!data.hasOwnProperty('first_name')){
        this.router.navigate(['prescription']) ;
        console.log("data nhi h") ;
        return ;
      }

      if(data._id != localStorage.getItem('patient_id')){
        this.router.navigate(['prescription']) ;
        console.log("id nhi h") ;

        return ;
      }

      this.patientData = data ;
      console.log(data) ;
    });

  	this.shareService.clinicData.subscribe(data => {
  		this.clinicData = data ;
  		console.log(data);
  	}, err => console.log(err));

    for(let service of this.services){
      if(!this.GSTBreakout.hasOwnProperty(service.GST)){
        this.GSTBreakout = {...this.GSTBreakout, [service.GST] : {amount : 0, cgst : 0, sgst: 0}} ;
      }
    }
    this.getPaymentModes() ;
    this.getStatusList() ;
    this.getServiceList() ;
    this.prescriptionService.doctorDataVal.subscribe(result => {
      this.doctorData = result ;
    }, err => console.log(err)) ;
  }

  selectService(index){
  	if(index >= 0 && index < this.services.length){
  		const service = this.services[index] ;
      const obj = {...service, quantity: 1, amount : 0} ;
      this.addedServices.push(obj) ;

      let i = this.addedServices.length - 1 ;
      this.applyDiscount(i) ;
      const gstAmount = (this.addedServices[i].amount * (service.GST / 100)) ;
      this.breakGST(service.GST,gstAmount) ;

  		const amount = this.addedServices[i].amount + gstAmount ;
      this.addedServices[i].amount = amount ;

  		// UPDATE TOTAL AMOUNT & NET AMOUNT
  		this.netAmount += service.rate ;
  		this.totalAmount += amount ;
      this.floorReduction() ;
      this.serviceSelect.nativeElement.value = -1 ;
  	}
  }

  floorReduction(){
    this.totalAmount = this.totalAmount - this.roundoffDeduction ;
    this.roundoffDeduction = +(Math.floor(this.totalAmount) - this.totalAmount).toPrecision(2) ;
    this.totalAmount = +Math.floor(this.totalAmount) ;
  }

  applyDiscount(index){
    const discount = this.totalDiscount ;
    const service = this.addedServices[index] ;
    this.addedServices[index].amount = service.quantity * (service.rate - (service.rate * (discount / 100))) ;
  }

  setQuantity(value, index){
  	if(value && typeof +value == typeof 5 && +value > 0){
  		const amountPerQuantity = this.addedServices[index].amount / this.addedServices[index].quantity ;
      const oldRate = this.addedServices[index].rate * this.addedServices[index].quantity ;

      // CHANGE GST BREAKOUT
      let oldGstAmount = oldRate - (oldRate * (this.totalDiscount / 100)) ;
      oldGstAmount = oldGstAmount * (this.addedServices[index].GST / 100) ;

      const newGstAmount = (oldGstAmount / this.addedServices[index].quantity) * (+value) ;

      // REMOVE OLD GST AMOUNT FIRST
      this.removeGSTBreakout(this.addedServices[index].GST, oldGstAmount) ;

      // ADD NEW GST BREAKOUT
      this.breakGST(this.addedServices[index].GST, newGstAmount) ;

  		// CHANGE TOTAL AMOUNT AND NET AMOUNT
  		this.netAmount -= oldRate ;
  		this.netAmount += this.addedServices[index].rate * (+value) ;

  		// CHANGE ITEM AMOUNT
      this.totalAmount -= this.addedServices[index].amount ;
      this.totalAmount -= +this.roundoffDeduction ;
	  	this.addedServices[index].quantity = +value ;
	  	this.addedServices[index].amount = amountPerQuantity * (+value) ;
      this.totalAmount += this.addedServices[index].amount ;
      this.floorReduction() ;
      
  	}
  }

  deleteService(index){
    const rate = (this.addedServices[index].rate * this.addedServices[index].quantity) ;
    const discountRate = rate - (rate * (this.totalDiscount / 100)) ;
    const gstAmount = discountRate * (+this.addedServices[index].GST / 100) ;

    console.log(rate, this.addedServices[index].rate) ;

    this.removeGSTBreakout(this.addedServices[index].GST, gstAmount) ;

  	this.netAmount = this.netAmount - (this.addedServices[index].rate * this.addedServices[index].quantity) ;
    this.totalAmount -= this.addedServices[index].amount ;
    this.totalAmount -= this.roundoffDeduction ;
    this.floorReduction() ;
  	this.addedServices.splice(index,1) ;
  }

  editService(index){
  	this.editIndex = index ;
  }


  saveService(index, gst){

  	if(typeof +gst != typeof 5 || +gst < 0 || +gst > 100){
  		this.editIndex = -1 ;
  		return ;
  	}
  	let service = this.addedServices[index] ;
    this.totalAmount -= service.amount ;
    this.totalAmount -= this.roundoffDeduction ;

    // CHANGE GST BREAKOUT
    const rate = service.rate * service.quantity ;
    let oldGstAmount = rate - (rate * (this.totalDiscount / 100)) ;
    oldGstAmount = oldGstAmount * (service.GST / 100) ;

    this.removeGSTBreakout(service.GST, oldGstAmount) ;

    this.applyDiscount(index) ; 

    service = this.addedServices[index] ;

  	this.addedServices[index].GST = +gst ;
    const newGstAmount = service.amount * (+gst / 100) ;

    this.breakGST(+gst, newGstAmount) ;

  	const newAmount = service.amount + (service.amount * (+gst / 100)) ;
  	this.addedServices[index].amount = newAmount ;
    this.totalAmount += newAmount ;

    this.floorReduction() ;
  	this.editIndex= -1 ;
  }


  setDiscount(value){
  	if(value && typeof +value == typeof 5 && +value >= 0){
  		this.totalDiscount = +value ;
  		let totalAmount = 0 ;
      let i=0 ;
      this.GSTBreakout = {} ;

      for(let service of this.addedServices){
        let amount = service.rate - (service.rate * ((+value) / 100)) ;
        amount = amount + (amount * (service.GST) / 100) ;

        let gstAmount = service.quantity * (amount * (service.GST) / 100) ;

        if(!this.GSTBreakout.hasOwnProperty(service.GST)){
          this.GSTBreakout = {...this.GSTBreakout, [service.GST] : {amount : gstAmount.toPrecision(2), cgst : (gstAmount/2).toPrecision(2), sgst: (gstAmount/2).toPrecision(2) }} ;
        }
        else{
          this.GSTBreakout[service.GST].amount += +gstAmount.toPrecision(2) ;
          this.GSTBreakout[service.GST].cgst += (gstAmount / 2).toPrecision(2) ;
          this.GSTBreakout[service.GST].sgst += (gstAmount / 2).toPrecision(2) ;
        }

        this.addedServices[i++].amount = amount * service.quantity;
        totalAmount += (amount * service.quantity) ;
      }

      this.totalAmount = totalAmount ;
      this.floorReduction() ;     
  	}
  }

  breakGST(gst, value){

    if(!this.GSTBreakout.hasOwnProperty(gst)){
      const obj = {
        amount : +(value).toPrecision(2),
        cgst : +(value / 2).toPrecision(2) ,
        sgst : +(value / 2).toPrecision(2) 
      }
      this.GSTBreakout = {...this.GSTBreakout, [gst] : obj} ;
      return ;
    }

    this.GSTBreakout[gst].amount += +value.toPrecision(2) ;
    this.GSTBreakout[gst].cgst += +(value / 2).toPrecision(2) ;
    this.GSTBreakout[gst].sgst += +(value / 2).toPrecision(2) ;

  }

  removeGSTBreakout(gst, value){

    if(!this.GSTBreakout.hasOwnProperty(gst))
      return ;

    console.log(gst, value) ;

    this.GSTBreakout[gst].amount -= +value.toPrecision(2) ;
    this.GSTBreakout[gst].cgst -= +(value / 2).toPrecision(2) ;
    this.GSTBreakout[gst].sgst -= +(value / 2).toPrecision(2) ;
  }

  selectPayment(value){
    this.paymentMode = value ;
  }

  getKeys(obj){
    return Object.keys(obj) ;
  }

  generateInvoice(){
    const invoiceData = {
      is_taxable : "Yes",
      invoice_details : {
        invoice_date : this.date,
        invoice_url : this.URL,
        items : this.addedServices,
        net_amount : this.netAmount,
        discount : this.totalDiscount,
        roundoff_deduction : this.roundoffDeduction,
        total_amount : this.totalAmount,
        GST_breakout : this.GSTBreakout,
        clinic_id : this.clinicData._id,
        status : this.invoiceStatus
      },
      payer_details : {
        doctor_id : localStorage.getItem('doctorId'),
        patient_id : this.patientData._id,
        name : `${this.patientData.first_name} ${this.patientData.last_name}`,
        shipping_address : this.patientData.addresses[0] ,
        contact_details : this.patientData.contact_details
      }
    }

    const header = {
      paymentId : this.paymentModeList[this.paymentMode]._id,
      clinic_id : this.clinicData._id,
      patient_id : this.patientData._id,
      invoice_status : this.invoiceStatus
    }
    console.log(invoiceData, header) ;

    this.invoiceService.createInvoice(invoiceData, header).subscribe(result => {
      console.log(result) ;
      this.complete() ;
    }, err => console.log(err))
  }

  getPaymentModes(){
    this.invoiceService.getPaymentModes().subscribe(result => {
      const rawData = atob(result.Data) ;
      if(rawData.length){
        const paymentData = JSON.parse(rawData) ;
        for(let payment of paymentData){
          const obj = {
            paymentMode : payment.payment_mode,
            _id : payment._id
          }
          this.paymentModeList.push(obj) ;
        }
      }
    });
  }

  getStatusList(){
    this.invoiceService.getStatusModes().subscribe(result => {
      const rawData = atob(result.Data) ;
      if(rawData.length){
        const statusList = JSON.parse(rawData) ;
        this.statusList = [...statusList] ;
        console.log(this.statusList) ;

        this.selectStatus("64180f0c-467d-431b-be5b-94909782c9f6") ;
      }
    }, err => console.log(err));
  }

  getServiceList(){
    // SERVICES AND ITEMS ARE THE SAME HERE

    this.invoiceService.getItemList().subscribe(result => {
      const rawData = atob(result.Data) ;
      if(rawData.length){
        const serviceList = JSON.parse(rawData) ;
        for(let item of serviceList){
          const obj = {
            _id : item._id,
            rate : item.batch_details.item_rate,
            GST : item.batch_details.item_gst,
            name : item.item_name
          }
          this.services.push(obj) ;
        }
        console.log(serviceList) ;
      }
    }, err => console.log(err)) ;
  }

  selectStatus(statusId){
    this.invoiceStatus = statusId ;
  }

  complete(){
    const obj = {
      _id : this.appointmentId,
      patient_id : this.patientData._id,
      clinic_id : this.clinicData._id,
      state_appointment : 'Seen'
    }
    this.appointmentService.appointmentCreate(obj, 'patch').subscribe(result => {
      let docname = localStorage.getItem('doctorName') ;
      this.router.navigate(['queuemgmt', 'doctor', docname]) ;
    }, err => console.log(err));
  }

}
