import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog' ;
import { ShareService } from '../../share.service' ;
import * as moment from 'moment';


@Component({
  selector: 'app-pre-appointment',
  templateUrl: './pre-appointment.component.html',
  styleUrls: ['./pre-appointment.component.scss']
})
export class PreAppointmentComponent implements OnInit {

	selected = -1 ;
	data ;
	clinicData ;
	patientData ;
	doctorNames = {} ;
  age ;
  allVitals = {}

  constructor(private dialogRef: MatDialogRef<PreAppointmentComponent>, @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any, private shareService: ShareService) { }

  ngOnInit() {
  	this.shareService.clinicData.subscribe(data => {
  		this.clinicData = data ;
  	});
  	if(this.dialogData){
  		this.data = this.dialogData.appointments ;
      this.data.reverse() ;
  		this.patientData = this.dialogData.patientData ;
      this.age = moment().diff(moment(this.patientData.date_of_birth, 'YYYY-MM-DD'), 'years');
      let i =0 ;
      for(let appointment of this.data){
       
        const allvitals = appointment.patient_vital ? JSON.parse(appointment.patient_vital) : { vitals : [] , customVitals : [] } ;
        const vitals  = allvitals.vitals ;
        const customVitals = allvitals.customVitals ;

        console.log(vitals) ;

        const finalVital = [...vitals, ...customVitals] ;
        this.allVitals = { ...this.allVitals , [i] : [...finalVital] } ;
        i++ ;
      }
      console.log(this.allVitals) ;
    }
  }

  setSelected(index){
  	if(index === this.selected){
  		this.selected = -1 ;
  	}
  	else
  		this.selected = index ;
  }
  
  closeModal() {
    // this.shareService.updateClinicData(this.allClinicData) ;
    this.dialogRef.close();
  }

}
