import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientComponent } from '../../patient/add-patient/add-patient.component';
import { PatientService } from '../../patient/patient.service';
import { BookAppointmentComponent } from '../book-appointment/book-appointment.component';
import { Router } from '@angular/router' ;
import { Subject } from 'rxjs';
import { OverlayServiceService } from 'src/app/shared/components/overlay-service.service';

@Component({
  selector: 'app-book-appointment-search',
  templateUrl: './book-appointment-search.component.html',
  styleUrls: ['./book-appointment-search.component.scss']
})
export class BookAppointmentSearchComponent implements OnInit {

  searchForm: FormGroup;
  submitted = false;
  formOneClass: string;
  searchDataExists = true;
  searchResults: any;
  searchTerm$ = new Subject<string>();

  constructor(private overlayService: OverlayServiceService,private dialog: MatDialog, private fB: FormBuilder, private patientService: PatientService, private router: Router) {
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
      });
    }
  }

  ngOnInit() {
    this.createForm();
    this.searchForm.get('search').valueChanges.subscribe(
      value => {
        if (value) {
          this.submitted = false;
        } else {
          this.searchResults = '';
        }
      }
    );
  }

  createForm() {
    this.searchForm = this.fB.group({
      search: ['', Validators.compose([Validators.required])]
    });
  }

  /* onSearch() {
    this.submitted = true;
    this.formOneClass = 'invalid-form';
    if (this.searchForm.valid) {
      const searchData = this.searchForm.get('search').value;
      this.patientService.readPatientDetails({ search_term: searchData }).subscribe((data: any) => {
        if (data) {
          this.searchDataExists = true;
          const patientDet = JSON.parse(atob(data.Data));
          localStorage.setItem('patientId', patientDet[0]._id);
        }
      }, (error) => {
        this.searchDataExists = false;
        console.log('Get patient details error', error);
      });
    }
  } */

  isFieldValid(field): boolean {
    return ((!this.searchForm.get(field).valid && this.searchForm.get(field).touched)
      || (this.searchForm.get(field).untouched && this.submitted));
  }

  addNewPatient() {
   this.router.navigate(['/patient/addpatient']) ;
  }

  bookAppointment(patientDet) {
    const dialogRef = this.dialog.open(BookAppointmentComponent, {
      width: '800px',
      data: {patientData: patientDet}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // ngAfterViewInit() {
  //   this.overlayService.showOverlay(4);
  // }

}
