import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { VitalsComponent } from 'src/app/appointment/vitals/vitals.component';

@Component({
  selector: 'app-vitalsoverwriteconfirm',
  templateUrl: './vitalsoverwriteconfirm.component.html',
  styleUrls: ['./vitalsoverwriteconfirm.component.scss']
})
export class VitalsoverwriteconfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VitalsoverwriteconfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const object = {
      'patient_id': this.data.patient_id,
      'appointment_id': this.data.appointment_id
    }


  }

  onClickVitals(){
    let dialogRef = this.dialog.open(VitalsComponent, {
      height: '600px',
      width: '950px',
      data: {'patient_id': this.data.patient_id,
      'appointment_id': this.data.appointment_id}
    });
  }



}
