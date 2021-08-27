import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatStepper} from '@angular/material/stepper';


@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss']
})
export class EmailConfirmComponent implements OnInit {

  constructor( @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any, private dialog: MatDialog, public dialogRef: MatDialogRef<EmailConfirmComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  
  }

}
