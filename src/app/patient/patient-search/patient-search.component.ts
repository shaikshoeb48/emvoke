import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { PatientService } from '../patient.service';
import { OverlayServiceService } from 'src/app/shared/components/overlay-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss']
})
export class PatientSearchComponent implements OnInit {

  searchResults: any;
  patientResult;
  searchTerm$ = new Subject<string>();
  search = true;

  constructor(private overlayService: OverlayServiceService, private patientService: PatientService, private router: Router) {
    if (this.searchTerm$) {
      this.patientService.searchPatient(this.searchTerm$)
        .subscribe(results => {
          if (results.Data) {
            const patientDet = JSON.parse(atob(results.Data));
            this.searchResults = patientDet;
            //console.log(this.searchResults)
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

  ngOnInit() { }

  getPatientDetails(result) {
    this.patientService.patientDetails = result;
    this.patientResult = result;
    this.router.navigate(['/patient/patientdetails'])
    // this.search = false;
  }

  goBack() {
    this.search = true;
    this.patientResult = null;
  }
  // onBookAppointment() {
  //   const dialogRef = this.dialog.open(BookAppointmentComponent, {
  //     width: '500px'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Reception dialog result: ${result}`);
  //   });
  // }

  // addBulkPatients() {
  //   this.router.navigate(['patient/bulkpatient']);
  // }

  // ngAfterViewInit() {
  //   this.overlayService.showOverlay(5);
  // }

}
