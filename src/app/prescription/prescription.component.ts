import { Component, OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router' ;
import { Location } from '@angular/common' ;
import { PrescriptionService } from './prescription.service' ;
import { AppointmentService } from '../appointment/appointment.service' ;
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from '../patient/patient.service' ;
import { ConsultComponent } from '../appointment/consult/consult.component' ;
import { PreAppointmentComponent } from './pre-appointment/pre-appointment.component' ;
import { NotificationService } from '../core/services/notification.service';
import { DatePipe } from '@angular/common';
import { ShareService } from '../share.service' ;
import { AlertComponent } from '../core/components/alert/alert.component' ;
import { Debounce } from '../core/decorators/debounce.decorator' ;

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit , OnDestroy {



  mainTab = 'consult' ;
  allData = {} ;
  allPatientList =[] ;
  showMid = false ;
  selectedArray = ["symptoms" , "examination_findings" , "findings" , "diagnosis" , "medicines" , "investigation", "procedures"] ;
	selected = "symptoms" ;
  completedArray = [false , false , false , false , false , false , false] ;
  appointmentData  ;
  patientData  ;
  openPdf = false ;
  appointment_id;
  patient_id;
  videoOn = false ;
   vitals = [

    { name : 'Pulse' , units : ['Hz'] , value : '' , unit : ''},
    { name : 'Height' , units : ['cm' , 'm' , 'ft'] , value : '',  unit : ''},
    { name : 'Weight' , units : ['Kg' , 'g' , 'lbs'] , value : '' ,  unit : ''},
    { name : 'Systolic' , units : ['mmHg', 'atm' , 'Pa'] , value : '' ,  unit : ''},
    { name : 'Distolic' , units : ['mmHg' , 'atm' , 'Pa'] , value : '' ,  unit : ''},
    { name : 'SPO2', units : ['yo'] , value : '' ,  unit : ''},
    { name : 'Temprature' , units : ['C' , 'F' , 'K'] ,value : '' ,  unit : ''},
    { name : 'Sugar' , units : ['mg' , 'ml'], value : '' ,  unit : ''},
    { name : 'ECOG Score' , units : ['T'], value : '' ,  unit : ''},
    { name : 'CAT Score' , units : ['%'] , value : '' , unit : ''}

  ] ;

    vitalText: string  ;

  constructor(private router: Router, private _location: Location ,
               private prescriptionService: PrescriptionService ,
               private appointmentService: AppointmentService,
               private patientService: PatientService,
               private dialog: MatDialog,
               private notification: NotificationService,
               private datepipe: DatePipe,
               private shareService: ShareService
              ) { }

  ngOnInit() {
   this.appointment_id = localStorage.getItem('appointment_id') ;
   localStorage.setItem('status', 'Queue') ;
   console.log("appointment_status");
   this.patient_id = localStorage.getItem('patient_id') ;

    this.patientService.readPatientDetailsById(this.patient_id).subscribe(data => {
      this.patientData = JSON.parse(atob(data.Data)) ;
      this.allData = {...this.allData , patientData : {...this.patientData } } ;
      this.prescriptionService.setPatientData(this.patientData) ;
      console.log(this.patientData) ;
    });
    this.appointmentService.readAppointmentDetails({ appointment_id: this.appointment_id, patient_id: this.patient_id }).subscribe(data => {
      this.appointmentData = JSON.parse(atob(data.Data)) ;
      this.allData = {...this.allData , appointmentData : { ...this.appointmentData} } ;
      console.log(this.appointmentData) ;

      this.vitalText = this.appointmentData.patient_vital ? this.appointmentData.patient_vital : "" ;
      this.createVitals(this.vitalText) ;
      console.log(this.vitals);

      for(let i=0 ; i < this.selectedArray.length ; i++){
        const key = this.selectedArray[i] ;
        if(this.appointmentData[key] && this.appointmentData[key].length){
          this.completedArray[i] = true ;
        }
      }
      this.readAllPatients() ;

    });

    let doctorId = localStorage.getItem('doctorId') ;  

    if(!doctorId){
      this.backToQueue() ;
      return ;
    }
    
    this.prescriptionService.doctorDataVal.subscribe(data => {
      if(!data.hasOwnProperty('_id')){
          this.prescriptionService.getDoctorDetails(doctorId).subscribe(result => {
          let doctorData = JSON.parse(atob(result.Data)) ;
          this.prescriptionService.setDoctorData(doctorData) ;
        }, err => console.log(err));
      }
    }, err => console.log(err))
  }

  startCall() {
    this.videoOn = true ;
  }




  @Debounce(600)
  submitGlobalNotes(event){
    const text = event.target.value ;
    const data_obj = {
      _id : localStorage.getItem('appointment_id') ,
      patient_id: localStorage.getItem('patient_id') ,
      notes : text,
      clinic_id : localStorage.getItem('clinicId')
    }
    console.log(data_obj) ;
    this.appointmentService.appointmentCreate(data_obj, 'patch').subscribe(result => {
      console.log("Global Notes Updated", text) ;
    }, error => {console.log(error)}) ;
  }

  readAllPatients(){
    this.allPatientList = [] ;
    let doctorId = localStorage.getItem('doctorId') ;  
    let date: any = new Date() ;
    date = this.datepipe.transform(date,'yyyy-MM-dd');
    this.prescriptionService.readAppointmentDetailsByDoctor(this.prescriptionService.getDoctorHeader(doctorId, date)).subscribe(data => {
      const rawData = atob(data.Data) ;
      if(rawData){
        const patientsData = JSON.parse(atob(data.Data)) ;
        patientsData.forEach(patient => {
          if(patient.state_appointment === 'Queue'){
            this.allPatientList.push({
              name : patient.patient_name,
              patientId : patient.patient_id,
              time : new Date(patient.check_in_time),
              appointmentId : patient._id
            }) ;
          }
        });  
      }
      this.allPatientList.sort((a,b) => {
        if(a.time > b.time){
          return 1 ;
        }
        else{
          return -1 ;
        }
      })
      console.log(this.allPatientList) ;
    });
  }

  consultPatient(patientId, appointmentId){

    const alertDialogRef = this.dialog.open(AlertComponent, {
      width : '400px',
      data : {
        title : 'Alert',
        message : `Do you want to hold current patient's consultation & resume it after some time?`,
        button1 : 'Yes',
        button2 : 'No'
      }
    });

    alertDialogRef.afterClosed().subscribe(result => {
      if(result == 'okay'){
        const data_obj = {
          _id : this.appointment_id,
          patient_id : this.patient_id ,
          clinic_id : localStorage.getItem('clinicId'),
          state_appointment : 'Queue'
        }

        this.appointmentService.appointmentCreate(data_obj, 'patch').subscribe(result => {
          console.log("updated") ;
           localStorage.setItem('appointment_id', appointmentId) ;
           localStorage.setItem('patient_id', patientId) ;

           this.appointment_id = appointmentId ;
           this.patient_id = patientId ;

           this.selected = "symptoms" ;
           this.completedArray = [false , false , false , false , false , false , false] ;
           this.appointmentData = NaN  ;
           this.patientData = NaN ;
           this.vitals = [
              { name : 'Pulse' , units : ['Hz'] , value : '' , unit : ''},
              { name : 'Height' , units : ['cm' , 'm' , 'ft'] , value : '',  unit : ''},
              { name : 'Weight' , units : ['Kg' , 'g' , 'lbs'] , value : '' ,  unit : ''},
              { name : 'Systolic' , units : ['mmHg', 'atm' , 'Pa'] , value : '' ,  unit : ''},
              { name : 'Distolic' , units : ['mmHg' , 'atm' , 'Pa'] , value : '' ,  unit : ''},
              { name : 'SPO2', units : ['yo'] , value : '' ,  unit : ''},
              { name : 'Temprature' , units : ['C' , 'F' , 'K'] ,value : '' ,  unit : ''},
              { name : 'Sugar' , units : ['mg' , 'ml'], value : '' ,  unit : ''},
              { name : 'ECOG Score' , units : ['T'], value : '' ,  unit : ''},
              { name : 'CAT Score' , units : ['%'] , value : '' , unit : ''}

            ] ;
            this.openPdf = false ;
            this.mainTab = 'consult' ;
            this.allData = {} ;
            this.allPatientList = [] ;

            this.patientService.readPatientDetailsById(this.patient_id).subscribe(data => {
              this.patientData = JSON.parse(atob(data.Data)) ;
              this.allData = {...this.allData , patientData : {...this.patientData } } ;
              console.log(this.patientData) ;
            });
            this.appointmentService.readAppointmentDetails({ appointment_id: this.appointment_id, patient_id: this.patient_id }).subscribe(data => {
              this.appointmentData = JSON.parse(atob(data.Data)) ;
              this.allData = {...this.allData , appointmentData : { ...this.appointmentData} } ;
              console.log(this.appointmentData) ;

              this.vitalText = this.appointmentData.patient_vital ? this.appointmentData.patient_vital : "" ;
              this.createVitals(this.vitalText) ;
              console.log(this.vitals);

              for(let i=0 ; i < this.selectedArray.length ; i++){
                const key = this.selectedArray[i] ;
                if(this.appointmentData[key] && this.appointmentData[key].length){
                  this.completedArray[i] = true ;
                }
              }

              const curData = {
                _id : this.appointment_id,
                patient_id : this.patient_id ,
                clinic_id : localStorage.getItem('clinicId'),
                state_appointment : 'Consulting'
              }

              this.appointmentService.appointmentCreate(curData, 'patch').subscribe(result => {
                 this.readAllPatients() ;
              });

            });
        }, error => {
          console.log(error)
        }) ;
      }
      else{
        
      }
    });
  }

  checkBooking(event){
    if(event){
      if(this.shareService.checkBooking){
        console.log(this.shareService.checkBooking) ;
        this.readAllPatients() ;
        this.shareService.checkBooking = false ;
      }
    }
    console.log(event);
  }

  changeTab(event){
    this.selected = this.selectedArray[event + 1] ;
    this.completedArray[event] = true ;
    this.prescriptionService.setSelected(this.selected) ;
  }

  setSelected(value){
  	this.selected = value ;
    this.prescriptionService.setSelected(value) ;
    if (value == 'medical_history') {
      this.onMedicalHistory();
    }
  }

  onMedicalHistory() {
    console.log(this.patientData);
    const data = {
      appointment_id: this.appointment_id,
      patient_id: this.patient_id,
      hideVitals: true
    };
      const dialogRef = this.dialog.open(ConsultComponent , {
        width : '1600px',
        height : '95vh',
        data : data
      });
      dialogRef.afterClosed().subscribe(result => {
      }, error => {});
  }

  backToQueue(){
  	// this._location.back();
    const data_obj = {
      _id : localStorage.getItem('appointment_id') ,
      patient_id: localStorage.getItem('patient_id') ,
      state_appointment : localStorage.getItem('status') == 'Seen' ? 'Seen' : 'Queue' ,
      clinic_id : localStorage.getItem('clinicId')
    }
    this.appointmentService.appointmentCreate(data_obj, 'patch').subscribe(result => {
      let docname = localStorage.getItem('doctorName') ;
      localStorage.removeItem('patient_id') ;
      localStorage.removeItem('status') ;
      this.router.navigate(['queuemgmt', 'doctor', docname]) ;
    }, error => {console.log(error)}) ;
  }

  changeMainTab(value){
    this.mainTab = value ;
  }

  openPdfPreview(){
    this.openPdf = !this.openPdf ;
  }

  createVitals(vitalText){
   if(vitalText){
      const vitalObj = JSON.parse(vitalText) ;
      const vitals = vitalObj.vitals ;
      const customVitals = vitalObj.customVitals ;

      for(let i=0; i<vitals.length; i++){
        for(let j=0; j<this.vitals.length ; j++){
          if(vitals[i].name === this.vitals[j].name){
            this.vitals[j].value = vitals[i].value ;
            this.vitals[j].unit = vitals[i].unit ;
            break ;
          }
        }
      }

      for(let obj of customVitals){
         this.vitals.push(obj) ;
      }

      console.log(this.vitals) ;
   }
  }


//   createVitals(vitalsText){

//     let vitalName = '' ;
//     let vitalValue = '' ;
//     let vitalUnit = '' ;
//     let custom = false ;

//     let index = 0 ;
//     let cur = 1 ;
//     let i = 0 ;

//     for(i=0; i<vitalsText.length; i++){
      
//       if(vitalsText[i] !== ',' && vitalsText[i] !== '@' && vitalsText[i] !== ':' && vitalsText[i] !== '|'){
//         if(cur === 1)  vitalName += vitalsText[i] ;
//         else if(cur === 2) vitalValue += vitalsText[i] ;
//         else if(cur === 3) vitalUnit += vitalsText[i] ;
//       }

//       else if(vitalsText[i] === ':') {
//         cur = 2 ;
//       }

//       else if(vitalsText[i] === '@') {
//         cur = 3 ;
//       }

//       else if(vitalsText[i] === '|') {
//         custom = true ;
//       }

//       else if(vitalsText[i] === ',' && vitalName !== ''){

//          while(vitalName != this.vitals[index].name) {
//             index++ ;
//          }

//          this.vitals[index].value = vitalValue ;
//          this.vitals[index].unit = vitalUnit ;

//         vitalName = '' ;
//         vitalValue = '' ;
//         vitalUnit = '' ;
//         cur = 1 ;
//       }
//   }
// }

createVitalText(){
    let finalVital = {
      vitals : [] ,
      customVitals : []
    }

    for(let vital of this.vitals){
     if(vital.value){
        let obj = {
          name : vital.name ,
          value : vital.value,
          unit : vital.unit
        }

        finalVital.vitals.push(obj) ;
     }
    }

    console.log(finalVital) ;
    return JSON.stringify(finalVital) ;
  }


 //  createVitalText(){
 //    let vitalText = "" ;
 //      for(let i=0 ; i<this.vitals.length ; i++){
 //        if(this.vitals[i].value !== ''){
 //          vitalText += this.vitals[i].name ;
 //          vitalText += ':' ;

 //          vitalText += this.vitals[i].value ;
 //          vitalText += '@' ;

 //          vitalText += this.vitals[i].unit ;
 //          vitalText += ',' ;
 //        }
 //      }
 //     return vitalText ; 
 // }

 addVital(value,index){
   this.vitals[index].value = value ;
 }

 addVitalUnit(value,index){
   this.vitals[index].unit = value ;
 }

 openPreAppointment(){
   this.appointmentService.getAllAppointments(this.patient_id).subscribe(data => {
     if(atob(data.Data)){
        const appointments = JSON.parse(atob(data.Data)) ;
        const dialogRef = this.dialog.open(PreAppointmentComponent ,{
         width : '1600px',
         height : '95vh',
         data : { appointments , patientData : this.patientData }
       }) ;
       dialogRef.afterClosed().subscribe(result => {
         console.log(appointments) ;
       }, error => console.log(error)) ;
     }
     else{
       this.notification.show("No Previous Appointments" , 'Ok', 8000);
     }
   }) ;
 }

onSubmitVitals(){
  const updatedVitalText = this.createVitalText() ;
    const data_obj = {
      _id : localStorage.getItem('appointment_id') ,
      patient_id: localStorage.getItem('patient_id') ,
      patient_vital : updatedVitalText,
      clinic_id : localStorage.getItem('clinicId')
    }
    console.log(data_obj) ;
    this.appointmentService.appointmentCreate(data_obj, 'patch').subscribe(result => {
      console.log("updated") ;
    }, error => {console.log(error)}) ;
    console.log("Clicked");
}

  ngOnDestroy(){}

}
