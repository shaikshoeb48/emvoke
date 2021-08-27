import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { BookAppointmentComponent } from '../../../appointment/book-appointment/book-appointment.component';
import { PatientService } from '../../../patient/patient.service';
import { ShareService } from '../../../share.service';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.scss']
})
export class SearchPatientComponent implements OnInit {

  searchResults: any;
  patientResult;

  searchTerm$ = new Subject<string>();
  @Output() patientSelect: EventEmitter<any> = new EventEmitter();
  search = true;

  show = true;
  clickIn = false;
  @HostListener('document:click', ['$event'])

  clickout() {
    this.show = false;
    if(this.clickIn){
      this.show = true;
    }
    this.clickIn = false;
  }
  clickin() {
    this.clickIn = true;
  }

  clickit() {
    this.show = true;
  }

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private patientService: PatientService,
    private shareService: ShareService
  ) {
    if (this.searchTerm$) {
      this.patientService.searchPatient(this.searchTerm$)
        .subscribe(results => {
          if (results.Data) {
            const patientDet = JSON.parse(atob(results.Data));
            this.searchResults = patientDet;
          } else {
            this.searchResults = '';
          }
        }, (error) => {
          console.log('Get patient details error', error);
        });
    } else {
      this.searchResults = null;
    }
  }

  ngOnInit() {
  }

  onDetails(result) {
    this.shareService.patientDetails = result;
    this.patientResult = result;
    this.router.navigate(['/patient/patientdetails']);
  }

  bookAppointment(patientDet) {
    console.log(patientDet)
    const dialogRef = this.dialog.open(BookAppointmentComponent, {
      width: '800px',
      data: { patientData: patientDet }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.patientSelect.emit(true);
    });
  }

  selectedSearch = "patients";
  selectSelect(search) {
    this.selectedSearch = search;
  }

}
