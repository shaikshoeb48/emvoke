import { Component, OnInit , Input, Output , EventEmitter , ViewChild , ElementRef } from '@angular/core';
import { ShareService } from '../../share.service' ;
import { Router } from '@angular/router' ;
import * as jsPDF from 'jspdf' ;
import * as moment from 'moment';
import { AppointmentService } from '../../appointment/appointment.service' ;
import { PrescriptionService } from '../prescription.service' ;

@Component({
  selector: 'app-prescription-pdf',
  templateUrl: './prescription-pdf.component.html',
  styleUrls: ['./prescription-pdf.component.scss']
})
export class PrescriptionPdfComponent implements OnInit {

  doctorName = localStorage.getItem('doctorName');
  doctorId = localStorage.getItem('doctorId') ;
  doctorData ;
  clinicData ;
  investigationObj = [] ;
  medicineObj= [] ;
  procedureObj = [] ;
  examinationFindingsObj = [] ;
  findingsObj = [] ;
  @Input('data') allData ;
  data ;
  patientData ;
  @ViewChild('pdfContent') pdfContent : ElementRef ;
  followUp = "" ;
  notes = "" ;
  refDoctor ;
  vitals ;
  age ;
  clinicLogo ;
  @Output() closePreview: EventEmitter<any> = new EventEmitter() ;	
  customizeOption = {
    'vitals' : false ,
    'signature' : true ,
    'pharmacist_notes' : true ,
    'med_history' : true,
    'allergies' : true ,
    'symptoms' : true ,
    'findings' : true ,
    'medicines' : true ,
    'investigation' : true,
    'instructions' : true ,
    'procedures' : true,
    'diagnosis' : true,
    'speciality':true,
    'specialization':true,
    'disclaimer':true,
    'clinicTimings':true,
    'logo' : true
  }
  signature ;

  constructor(private shareService: ShareService, private appointmentService: AppointmentService, private router: Router, private prescriptionService: PrescriptionService) { }

  ngOnInit() { 
    this.patientData = this.allData.patientData;
    this.shareService.clinicData.subscribe(data => {
      this.clinicData = data ;
      console.log(data) ;
      if(data.logo){
        this.shareService.imageDataSh.subscribe((logo) => {
          this.clinicLogo = logo.data
          console.log(logo)
          //   console.log("yes got prof it is clinic")
        })
      }
    });

    this.prescriptionService.doctorDataVal.subscribe(data => {
      if(!data.hasOwnProperty('_id')){
        this.backToPrescription() ;
        return ;
      }
      this.doctorData = data ;
      console.log(this.doctorData) ;
    });

    this.appointmentService.readAppointmentDetails({ appointment_id: this.allData.appointmentData._id, patient_id: this.patientData._id }).subscribe(data => {
        this.data = JSON.parse(atob(data.Data)) ;
        this.allData = {...this.allData , data : { ...this.data} } ;
        console.log(this.data) ;
        if(this.data.patient_vital)
          this.vitals = JSON.parse(this.data.patient_vital) ; 

        if(this.data.investigation.length){
          for(let inv of this.data.investigation){
            if(inv.instructions){
              const val = JSON.parse(inv.instructions) ;
              this.investigationObj.push(val) ;
            }
            else{
              const obj = {
                nursing_notes : "",
                doctor_notes : ""
              }
              this.investigationObj.push(obj) ;
            }
          }
        }

        if(this.data.medicines.length){
          for(let med of this.data.medicines){
            let obj = {} ;
            if(med.frequency_notes){
              const val = JSON.parse(med.frequency_notes) ;
              obj = {...obj, 'freq' : val} ;
            }
            if(med.duration){
              const val = JSON.parse(med.duration) ;
              obj = {...obj, 'duration': val} ;
            }

            this.medicineObj.push(obj) ;
          }
        }

        if(this.data.examination_findings.length){
          for(let finding of this.data.examination_findings){
            let wholeTerm = finding.finding_name.split("|") ;
            let term = wholeTerm[0] ;
            let midTerm = wholeTerm[1] ;

            const obj = {...finding, mid_term : midTerm} ;
            obj.finding_name = term ;

            this.examinationFindingsObj.push(obj) ;
          }
        }

        if(this.data.findings.length){
          for(let finding of this.data.findings){
            let wholeTerm = finding.finding_name.split("|") ;
            let term = wholeTerm[0] ;
            let midTerm = wholeTerm[1] ;

            const obj = {...finding, mid_term : midTerm} ;
            obj.finding_name = term ;

            this.findingsObj.push(obj) ;
          }
        }

        if(this.data.procedures.length){
          for(let prod of this.data.procedures){
           
            if(prod.notes){
              const notes = JSON.parse(prod.notes) ;
              this.procedureObj.push(notes) ;
            }
          }
        }
        console.log(this.vitals);
    });

    this.age = moment().diff(moment(this.patientData.date_of_birth, 'YYYY-MM-DD'), 'years');

    console.log(this.allData) ;
  }

  backToPrescription(){
  	this.closePreview.emit(true) ;
  }

  setFollowUp(value){
    this.followUp = value ;
  }

  setNotes(value){
    this.notes = value ;
  }

  setRefDoctor(value){
    this.refDoctor = value;
  }

  addFollowUpText(value){
    this.followUp = `${this.followUp} ( ${value} )` ;
  }

  downloadPdf(){
    let doc = new jsPDF() ;
    let specialElementHandlers = {
      '#editor' : (element , renderer) => {
        return true ;
      }
    }

    let content = this.pdfContent.nativeElement ;
    doc.fromHTML(content , 15 , 15 , {
      'width' : 180,
      'elementHandlers' : specialElementHandlers
    });

    doc.save('test.pdf') ;
  }

  setOption(event, key){
     this.customizeOption[key] = event.toElement.checked ;
     console.log("yes")
  }
  checkField(ev,field){
    this.customizeOption[field] = ev.target.checked;
  }

  complete(){
    const obj = {
      _id : this.allData.appointmentData._id,
      patient_id : this.patientData._id,
      clinic_id : localStorage.getItem('clinicId'),
      state_appointment : 'Seen'
    }
    this.appointmentService.appointmentCreate(obj, 'patch').subscribe(result => {
      let docname = localStorage.getItem('doctorName') ;
      localStorage.setItem('status', "Seen");
      // this.router.navigate(['queuemgmt', 'doctor', docname]) ;
    }, err => console.log(err));
  }

}
