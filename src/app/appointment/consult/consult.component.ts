import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AppointmentService } from '../appointment.service';
import { PatientService } from '../../patient/patient.service';


@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {


  current = 0;
  med_history = "active";
  nursing_notes = "";
  family_history = "";
  vitals = "";
  allergy = "";

  appointment_data;
  patient_data;


  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    // this.appointmentService.readAppointmentDetails(this.dialogData).subscribe(result => {
    //   const data = JSON.parse(atob(result.Data));
    //   this.appointment_data = data;
    // }, err => console.log(err));


    this.patientService.readPatientDetailsById(this.dialogData.patient_id).subscribe(result => {
      const data = JSON.parse(atob(result.Data));
      this.patient_data = data;
    }, err => console.log(err));
  }

  isCurrent(index) {
    return index === this.current;
  }

  changeTab(tab) {
    this.onChange(tab + 1);
  }

  close() {
    this.dialog.closeAll();
  }

  onChange(index) {
    this.current = index;
    if (index === 0) {
      this.med_history = "active";
      this.family_history = "";
      this.vitals = "";
    }
    else if (index === 2) {
      this.med_history = "";
      this.family_history = "active";
      this.vitals = "";
    }
    else if (index === 3) {
      this.med_history = "";
      this.family_history = "";
      this.vitals = "active";
    }
  }

}
