import { Component, OnInit, Input } from '@angular/core';
//import { countryCodes } from '../add-patient/personal-info/country-codes';
import { PatientService } from '../patient.service';
import { AppointmentService } from 'src/app/appointment/appointment.service';
import { BookAppointmentComponent } from '../../appointment/book-appointment/book-appointment.component';
import { MatDialog } from '@angular/material/dialog';
import { ConsultComponent } from 'src/app/appointment/consult/consult.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ShareService } from '../../share.service' ;
import { PreAppointmentComponent } from 'src/app/prescription/pre-appointment/pre-appointment.component';
import { Router } from '@angular/router';
import { Debounce } from '../../core/decorators/debounce.decorator' ;
import { CountryCodeService } from '../../core/services/country-code.service' ;
import { DatePipe } from '@angular/common' ;
import { PatientAlertComponent } from '../patient-alert/patient-alert.component' ;


@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  
  selectedVital = "BP" ;
  visibleCountryCodes = false ;
  dropdownIndex = -1 ;
  countryCodeList = [] ;
  errorMsg = [] ;
  addressChange = false ;
  carePersonChange = false ;
  @Input() patientDetails: any;
  orignalData: any;
  prescriptionData = [];
  allData = {};
  age ;
  appointmentData;
  editEnable = true;
  openPdf = false;
  contact_types = [
    {text : 'Mobile', value : 'mobile'},
    {text : 'Telephone' , value : 'telephone'}
  ];
  mobno="\\d{8,10}";
  contactChanged = false;
  emergencyContactChanged = false;
  //countryCodes = countryCodes;
  updatedData = {};
  noOfAppointment = 3 ;
  nationality = ['India', 'American', 'Others'];
  visiblePrescription = [];
  updatedAddress = [] ;
  proofTypes = [{
      value: 'adhaar',
      text: 'Adhaar'
    },
    {
      value: 'passport',
      text: 'Passport'
    }
  ];
  tab = 'prevConsult'
  legalProof ;
  legalProofChange = false ;
  enableDateSearch=false ;
  updatedCarePerson = [] ;

  chartConfig = {
    modeBarButtonsToRemove: ['pan2d','select2d','lasso2d','resetScale2d', 'zoom2d', 'autoScale2d', 'hoverCompareCartesian', 'hoverClosestCartesian' ,'toggleSpikelines','editInChartStudio' ],
    displaylogo : false
  }
  public BPChart ;
  public sugarChart ;
  public tempChart ;
  public SPO2Chart ;


  constructor(
    private dialog: MatDialog,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private notification: NotificationService,
    private shareShare: ShareService,
    private router: Router,
    private countryCodeService: CountryCodeService,
    private datepipe: DatePipe) {

        this.patientDetails = this.patientService.patientDetails;

        if(!this.patientDetails){
          this.patientDetails = this.shareShare.patientDetails ;
        }

        if (!this.patientDetails) {
           this.router.navigate(['/patient/patientsearch']) ;
         }
     }

  ngOnInit() {
    

    // console.log('patientssss emaliiii',this.patientDetails);
    //parsing the nested objects due to inproper response
    this.patientDetails.family_history = this.patientDetails.family_history ? this.parseJSON(this.patientDetails.family_history) : '';
    this.patientDetails.medical_history.chronic_disease_history = this.patientDetails.medical_history.chronic_disease_history ? this.parseJSON(this.patientDetails.medical_history.chronic_disease_history) : '';
    this.patientDetails.medical_history.current_allergies = this.patientDetails.medical_history.current_allergies ? this.parseJSON(this.patientDetails.medical_history.current_allergies) : '';
    this.patientDetails.medical_history.current_medication = this.patientDetails.medical_history.current_medication ? this.parseJSON(this.patientDetails.medical_history.current_medication) : '';
    this.patientDetails.medical_history.menstruation_notes = this.patientDetails.medical_history.menstruation_notes ? this.parseJSON(this.patientDetails.medical_history.menstruation_notes) : '';
    this.patientDetails.medical_history.notes = this.patientDetails.medical_history.notes ? this.parseJSON(this.patientDetails.medical_history.notes) : {
      lifestyle: {
        notes: ''
      },
      others: {
        other_hospitalization_record_notes: '',
        other_medical_history_notes: ''
      },
      risk_factor: {
        risk_factor_notes: ''
      }
    };
    this.patientDetails.medical_history.prev_surgeries = this.patientDetails.medical_history.prev_surgeries ? this.parseJSON(this.patientDetails.medical_history.prev_surgeries) : '';
    if (this.patientDetails.emergency_person_details.length > 0) {
      this.patientDetails.emergency_person_details = this.patientDetails.emergency_person_details;
    }
    else {
      this.patientDetails.emergency_person_details = [];
      this.createEmptyEmergencyDetails();
    }
    this.age = this.calculateAge(new Date(this.patientDetails.date_of_birth)) ;

    if(this.patientDetails.addresses.length){
      this.updatedAddress = [...this.patientDetails.addresses] ;
    }
    else{
      this.addAddress() ;
    }

    if(this.patientDetails.care_person_details.length){
      this.updatedCarePerson = [...this.patientDetails.care_person_details] ;
    }
    else{
      this.addCarePerson() ;
    }

    // if(this.patientDetails.legal_proof.length){
    //   this.legalProof = [...this.patientData.legal_proof] ;
    // }
    // else{
    //   this.addLegalProof() ;
    // }

    //getting patient appointments
    this.appointmentService.getAllAppointments(this.patientDetails._id).subscribe(
      (a) => {
        if (a.Data)
          this.prescriptionData = JSON.parse(atob(a.Data));
          this.getPrescriptionNumber() ;
          this.createBPChart() ;
          this.createSugarChart() ;
          this.createTempChart() ;
          this.createSPO2Chart() ;
      }
    );

    for(let i=0; i<this.patientDetails.contact_details.length; i++){
      const obj = {
        contactMsg : "Verified",
        status : 1     // 1 --> verified   2 --> Not Verified    0 --> Not Available   3 --> Waiting
      }
      this.errorMsg.push(obj) ;
    }

    this.searchCountryCode() ;
  }

  changeTab(tab){
    this.tab = tab
  }

  setVital(value){
    console.log(event) ;
    this.selectedVital = value ;
  }

  createBPChart(){
    const vitals = [] ;
    for(let pres of this.prescriptionData){
      if(pres.patient_vital){
        let vital = JSON.parse(pres.patient_vital) ;
        vitals.push({vital, date: pres.appointment_date}) ;
      }
    }

    let systolic = [] ;
    let distolic = [] ;
    let x_systolic = [] ;
    let x_distolic = []
    let dates_systolic = [] ;
    let dates_distolic = [] ;

    let scounter = 1 ;
    let dcounter = 1 ;

    for(let vitalEl of vitals){
      const vital = vitalEl.vital.vitals ;
      const date = vitalEl.date ;
      
      for(let allVital of vital){
        if(allVital.name == 'Systolic'){
          systolic.push(allVital.value) ;
          dates_systolic.push(date) ;
          x_systolic.push(scounter++) ;
        }

        else if(allVital.name == 'Distolic'){
          distolic.push(allVital.value) ;
          dates_distolic.push(date) ;
          x_distolic.push(dcounter++) ;
        }
      }
    }


    console.log(vitals);
    this.BPChart = {
      data : [
        {
          x : x_systolic,
          y : systolic,
          type : 'scatter',
          marker: {color: 'blue'},
          name : 'Systolic',
          hovertext : dates_systolic,
          line : {
            width : 3
          }
        },
        {
          x : x_distolic,
          y : distolic,
          type : 'scatter',
          marker: {color: 'yellow'},
          name : 'Daistolic',
          hovertext : dates_distolic,
          line : {
            width : 3
          }
        }
      ],

      layout: { title: 'Blood Pressure', 
       yaxis : { title :  { text : "BP (mmHg)" } }
      }

    };
  }

  createSugarChart(){
    const vitals = [] ;
    for(let pres of this.prescriptionData){
      if(pres.patient_vital){
        let vital = JSON.parse(pres.patient_vital) ;
        vitals.push({vital, date: pres.appointment_date}) ;
      }
    }

    let sugar = [] ;
    let x = [] ;
    let dates = [] ;

    let counter = 1 ;

    for(let vitalEl of vitals){
      const vital = vitalEl.vital.vitals ;
      const date = vitalEl.date ;
      
      for(let allVital of vital){
        if(allVital.name == 'Sugar'){
          sugar.push(allVital.value) ;
          dates.push(date) ;
          x.push(counter++) ;
        }
      }
    }

    console.log(vitals);
    this.sugarChart = {
      data : [
        {
          x : x,
          y : sugar,
          type : 'scatter',
          marker: {color: 'blue'},
          name : 'Sugar',
          hovertext : dates,
          line : {
            width : 3
          }
        }
      ],

      layout: { title: 'Sugar', 
       yaxis : { title :  { text : "mg" } }
      }

    };
  }


  createTempChart(){
    const vitals = [] ;
    for(let pres of this.prescriptionData){
      if(pres.patient_vital){
        let vital = JSON.parse(pres.patient_vital) ;
        vitals.push({vital, date: pres.appointment_date}) ;
      }
    }

    let temp = [] ;
    let x = [] ;
    let dates = [] ;

    let counter = 1 ;

    for(let vitalEl of vitals){
      const vital = vitalEl.vital.vitals ;
      const date = vitalEl.date ;
      
      for(let allVital of vital){
        if(allVital.name == 'Temprature'){
          temp.push(allVital.value) ;
          dates.push(date) ;
          x.push(counter++) ;
        }
      }
    }

    console.log(vitals);
    this.tempChart = {
      data : [
        {
          x : x,
          y : temp,
          type : 'scatter',
          marker: {color: 'blue'},
          name : 'Temprature',
          hovertext : dates,
          line : {
            width : 3
          }
        }
      ],

      layout: { title: 'Temprature', 
       yaxis : { title :  { text : "F" } }
      }

    };
  }

   createSPO2Chart(){
    const vitals = [] ;
    for(let pres of this.prescriptionData){
      if(pres.patient_vital){
        let vital = JSON.parse(pres.patient_vital) ;
        vitals.push({vital, date: pres.appointment_date}) ;
      }
    }

    let spo2 = [] ;
    let x = [] ;
    let dates = [] ;

    let counter = 1 ;

    for(let vitalEl of vitals){
      const vital = vitalEl.vital.vitals ;
      const date = vitalEl.date ;
      
      for(let allVital of vital){
        if(allVital.name == 'SPO2'){
          spo2.push(allVital.value) ;
          dates.push(date) ;
          x.push(counter++) ;
        }
      }
    }

   
    this.SPO2Chart = {
      data : [
        {
          x : x,
          y : spo2,
          type : 'scatter',
          marker: {color: 'blue'},
          name : 'SPO2',
          hovertext : dates,
          line : {
            width : 3
          }
        }
      ],

      layout: { title: 'SPO2', 
       yaxis : { title :  { text : "unit" } }
      }

    };
  }

  calculateAge(date){
    let today = new Date() ;
    const milliSec = today.getTime() - date.getTime() ;
    const days = (milliSec / (1000*3600*24)) ;
    const months = Math.round((days % 365) / 30) ;
    const years = Math.floor(days / 365) ;
    console.log(`${years.toString()} Years ${months.toString()} Months`) ;

    return `${years.toString()} Years ${months.toString()} Months` ;
  }


  parseJSON(data) {
    try {
      JSON.parse(data);
    } catch (e) {
      return data;
    }
    return JSON.parse(data);
  }

  onCountryCode(index){
    this.visibleCountryCodes = !this.visibleCountryCodes ;
    this.dropdownIndex = this.visibleCountryCodes ? index : -1;
  }

  searchCountryCode(event?){
    const searchData = event ? event.target.value : '+91' ;
    this.countryCodeService.searchCountryCode(searchData).subscribe(list => {
      this.countryCodeList = list ;
    }, err => console.error(err)) ;
  }

  // removeCountryCode(){
  //   this.visibleCountryCodes = false;
  //   this.dropdownIndex = -1 ;
  // }

  checkDateSearch(event){
    this.enableDateSearch = event.target.checked ;
    
    if(!this.enableDateSearch){
      this.getPrescriptionNumber() ;
    }
  }

  searchByDate(date){
    if(!this.enableDateSearch)
      return ;

    let counter = 0 ;
    this.visiblePrescription = [] ;

    for(let pres of this.prescriptionData){
      if(pres.appointment_date == date){
        pres.appointment_date = this.datepipe.transform(new Date(pres.appointment_date), 'dd-MMM-yyyy') ;
        this.visiblePrescription.push(pres) ;
        counter++ ;
      }

      if(counter >= this.noOfAppointment){
        return ;
      }
    }
  }

  // addLegalProof(){
  //   this.legalProof.push({
  //     proof_name : this.proofTypes[0].value ,
  //     proof_details : ''
  //   }) ;
  // }

  // removeLegalProof(index){
  //   if(this.legalProof.length > 1){
  //     this.legalProof.splice(index, 1) ;
  //     this.legalProofChange = true ;
  //   }
  // }

  // updateProof(event, index, mode){
  //   this.legalProof[index][mode] = event.target.value ;
  //   this.legalProofChange = true ;
  // }

  checkCarePersonAddressType(index, value, event){
    this.updatedCarePerson[index].address_type = value ; 
    this.carePersonChange = true ;
  }

  addCarePerson(){
    this.updatedCarePerson.push({
      name : '',
      relationship : '',
      phone_type : 'mobile',
      phone_number : '',
      email_id : '',
      address_type: 'home',
      address_line1: '',
      address_line2: '',
      address_line3: '',
      city: '',
      district: '',
      state: '',
      pin_code: '',
      country: '',
      country_code: ''
    });
  }

  removeCarePerson(index){
    if(this.updatedCarePerson.length > 1){
      this.updatedCarePerson.splice(index,1) ;
    }
    else{
      this.notification.show("Atleast one Address is mandatory", "OK", 5000) ;
    }
  }

  updateCarePersonField(key, ev, index) {
    this.updatedCarePerson[index][key] = ev.target.value;
    this.carePersonChange = true ;
  }


  checkAddressType(index, value, event){
    this.updatedAddress[index].address_type = value ; 
    this.addressChange = true ;
  }

  addAddress(){
    this.updatedAddress.push({
      address_type: 'home',
      address_line1: '',
      address_line2: '',
      address_line3: '',
      city: '',
      district: '',
      state: '',
      pin_code: '',
      country: '',
      country_code: ''
    });
  }

  removeAddress(index){
    if(this.updatedAddress.length > 1){
      this.updatedAddress.splice(index,1) ;
    }
    else{
      this.notification.show("Atleast one Address is mandatory", "OK", 5000) ;
    }
  }

  updateAddressField(key, ev, index) {
    this.updatedAddress[index][key] = ev.target.value;
    this.addressChange = true ;
  }

  removeEmergencyDetail(index){
    if(this.patientDetails.emergency_person_details.length > 1){
      this.patientDetails.emergency_person_details.splice(index,1) ;
    }
    else{
      this.notification.show("Can not be empty", "OK", 5000) ;
    }
  }

  createEmptyEmergencyDetails() {
    console.log("clicked") ;
    this.patientDetails.emergency_person_details.push(
      {
        address_line1: "",
        address_line2: "",
        address_line3: "",
        address_type: "home",
        city: "",
        country: "",
        country_code: "",
        district: "",
        email_id: "",
        name: "",
        phone_number: "",
        phone_type: "",
        pin_code: "",
        relationship: "",
        state: "",
      }
    )
  }

  addingContactValid(mode){

    const index = this.patientDetails.contact_details.length - 1 ;
    const cd = this.patientDetails.contact_details[index] ;

    if(mode == 'create'){
      if(index == 0)
        return true ;
    }
    
    if(cd.phone_type && cd.phone_number && cd.country_code){
      return true ;
    }
    else{
      return false ;
    }
  }

  addNewContact() {
    if(this.addingContactValid('check')){
      this.patientDetails.contact_details.push(
        {
          country_code: '+91',
          phone_number: '',
          phone_type: this.contact_types[0].value
        }
      );
      this.errorMsg.push({
          contactMsg : "Waiting",
          status : 0
      }) ;
    }
     else{
      this.notification.show("Please fill the prevous contact fields first", "OK", 5000) ;
    }
  }

  removeContact(index) {
    if(this.patientDetails.contact_details.length > 1){
      this.patientDetails.contact_details.splice(index, 1);
      this.errorMsg.splice(index,1) ;
      console.log(this.updatedData) ;
    }
    else{
      this.notification.show('One contact detail is mandatory', "OK", 5000) ;
    }
  }

  saveContact(index,event){
    const alertDialog = this.dialog.open(PatientAlertComponent, {
      width : '400px',
      data : {
        title : 'Add this number?',
        message : `${this.patientDetails.contact_details[index].country_code} ${this.patientDetails.contact_details[index].phone_number}`
      }
    });
    alertDialog.afterClosed().subscribe(result => {
      if(result == 'okay' && event.target.value.match(this.mobno)){
        this.errorMsg[index].status = 3 ;
         const obj = {
          _id : this.patientDetails._id,
          contact_details : [{...this.patientDetails.contact_details[index]}]
        }
        console.log(obj) ;
        this.patientService.updateContactDetails(obj).subscribe(result => {
          console.log(result);
          this.errorMsg[index].status = 1 ;
        }, err => { 
          console.log(err) ;
          this.errorMsg[index].status = 2 ;
        }) ;
      }
      else{
        this.notification.show("Cancelled", "OK", 4000) ;
        return ;
      }
    });
  }

  @Debounce(900)
  onChangeContact(event, index, mode){
    this.patientDetails.contact_details[index][mode] = event.target.value ;
    const contact = this.patientDetails.contact_details[index] ;
    
    if(contact.phone_type && contact.country_code && contact.phone_number){
      this.saveContact(index,event) ;
    }
  }

  changeCountryCode(value, index, inputEl){
    this.patientDetails.contact_details[index]['country_code'] = value ;
     const contact = this.patientDetails.contact_details[index] ;
     inputEl.value = value ;
     console.log(this.patientDetails.contact_details[index]) ;
     this.visibleCountryCodes = false ;
     this.dropdownIndex = -1 ;
    
    if(contact.phone_type && contact.country_code && contact.phone_number){
      this.saveContact(index,event) ;
    }
  }

  onChangeEmergency(index, value){
    console.log("address_type", value);
    this.patientDetails.emergency_person_details[index].address_type = value ;
    this.emergencyContactChanged = true; 
  }

  onChange(event, index?, name?) {
   
    if (event.target.name == "emergency_person_details") {
      if (this.emergencyContactChanged == false) {
        this.updatedData['emergency_person_details'] = this.patientDetails.emergency_person_details;
        this.emergencyContactChanged = true;
        this.updatedData['emergency_person_details'][index][name] = event.target.value;
        console.log(this.updatedData)
      }
      else {
        this.updatedData['emergency_person_details'][index][name] = event.target.value;
        console.log(this.updatedData)
      }
    }
    else {
      this.updatedData[event.target.name] = event.target.value;
      console.log(this.updatedData)
    }
  }

  onSubmit() {
    if(this.addressChange){
      this.updatedData = {...this.updatedData, addresses : this.updatedAddress} ;
    }

    if(this.carePersonChange){
      this.updatedData = {...this.updatedData, care_person_details : this.updatedCarePerson} ;
    }

    // if(this.legalProofChange){
    //   this.updatedData = {...this.updatedData, legal_proof : this.legalProof} ;
    // }
    console.log(Object.assign({ _id: this.patientDetails._id }, this.updatedData)) ;
    this.patientService.updatePatient(Object.assign({ _id: this.patientDetails._id }, this.updatedData), this.patientService.getPatientHeader(this.patientDetails._id)).subscribe(
      (a) => {
        this.notification.show('Patient Details updated', 'Ok', 8000);
        console.log(a);
      }
    );
  }
  enableFields() {
    this.editEnable = false;
  }
  disableFields() {
    this.editEnable = true;
  }
  bookAppointment() {
    const dialogRef = this.dialog.open(BookAppointmentComponent, {
      width: '800px',
      data: { patientData: this.patientDetails }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openPdfPreview() {
    this.openPdf = !this.openPdf;
  }
  getAppointmentDetails(appointment_id) {
    var promise = new Promise((resolve, reject) => {
      this.appointmentService.readAppointmentDetails({ appointment_id: appointment_id, patient_id: this.patientDetails._id }).subscribe(data => {
        this.appointmentData = JSON.parse(atob(data.Data));
        this.allData = { ...this.allData, appointmentData: { ...this.appointmentData } };
        this.allData = { ...this.allData, patientData: { ...this.patientDetails } };
        console.log(this.appointmentData);
        resolve();
      })
    })
    promise.then(
      () => {
        //this.openPdf = !this.openPdf ;
        this.openPdfPreview();
      }
    )
  }
  openPatientHistory() {
    const data = {
      //appointment_id: this.appointment_id,
      patient_id: this.patientDetails._id,
      hideVitals: true
    };
    const dialogRef = this.dialog.open(ConsultComponent, {
      width: '1600px',
      height: '95vh',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    }, error => { });
  }


   openPreAppointment() {
       this.appointmentService.getAllAppointments(this.patientDetails._id).subscribe(data => {
        const rawData = atob(data.Data) ;
         if (rawData) {
           const appointments = JSON.parse(atob(data.Data));
           console.log(appointments) ;
           const dialogRef = this.dialog.open(PreAppointmentComponent, {
             width: '1600px',
             height: '95vh',
             data: { appointments, patientData: this.patientDetails }
           });
           dialogRef.afterClosed().subscribe(result => {
             console.log(appointments);
           }, error => console.log(error));
         }
         else {
           this.notification.show("No Previous Appointments", 'Ok', 8000);
         }
       });

       // if(this.prescriptionData){
       //  const dialogRef = this.dialog.open(PreAppointmentComponent, {
       //       width: '1600px',
       //       height: '95vh',
       //       data: { appointments: this.appointmentData, patientData: this.patientDetails }
       //     });
       //     dialogRef.afterClosed().subscribe(result => {
       //     }, error => console.log(error));
       // }
       // else {
       //     this.notification.show("No Previous Appointments", 'Ok', 8000);
       //  }
     }

     getPrescriptionNumber(){
      const len = this.prescriptionData.length > this.noOfAppointment ? this.noOfAppointment : this.prescriptionData.length ;
      this.visiblePrescription = [] ;
      for(let i=0; i<len; i++){
        this.prescriptionData[i].appointment_date = this.datepipe.transform(new Date(this.prescriptionData[i].appointment_date), 'dd-MMM-yyyy') ;
        this.visiblePrescription.push(this.prescriptionData[i]) ;
      }
     }
}


