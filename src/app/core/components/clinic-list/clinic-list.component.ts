import { Component, OnInit , Inject , Optional } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
import {FormControl } from '@angular/forms';


@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.scss']
})
export class ClinicListComponent implements OnInit {

	clinicList = [] ;  
  title: string ;
  button : string ;
  isButton: boolean ;
  input: boolean ;
  inputValue = new FormControl();

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any , public dialogRef: MatDialogRef<ClinicListComponent>) { }

  ngOnInit() {
      if(this.dialogData){
        this.title = this.dialogData.title ;
        this.clinicList = this.dialogData.clinicList ? this.dialogData.clinicList : [] ;
        this.button = this.dialogData.button ? this.dialogData.button : '' ;
        this.isButton = this.button ? true : false ;
        this.input = this.dialogData.input ? this.dialogData.input : false ;
      }
    
  }

  onClickClinic(clinic_id) {
    this.dialogRef.close(clinic_id) ;
  }

  onClickButton(){
    // console.log(this.receptionistName.value);
    // localStorage.setItem('Recepname',this.receptionistName.value);
    // this.dialogRef.close() ;

    const value = this.inputValue.value ;
    this.dialogRef.close(value) ;
  }
}
