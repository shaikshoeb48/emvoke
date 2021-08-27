import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog' ;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  title: string ;
  message: string ;	
  button1: string ;
  button2: string ;
  extra: any ;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,  public dialogRef: MatDialogRef< AlertComponent>) { }

  ngOnInit() {
  	if(this.dialogData) {
  		this.title = this.dialogData.title ;
  		this.message = this.dialogData.message ;
      this.button1 = this.dialogData.button1 ? this.dialogData.button1 : 'Okay' ;
      this.button2 = this.dialogData.button2 ? this.dialogData.button2 : 'Cancel' ;
      this.extra = this.dialogData.extra ? this.dialogData.extra : {} ;
  	}
  }

  onOkay() {
  	this.dialogRef.close('okay') ;
  }

  onCancel() {
  	this.dialogRef.close('cancel') ;
  }

}
