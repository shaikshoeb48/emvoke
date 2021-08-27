import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { NotificationService } from '../core/services/notification.service';
import { switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
// import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { empty } from 'rxjs' ;

@Injectable()
export class PatientService {

  serverUrl = `${environment.baseUrl}${environment.baseParameter}`;
  patientDetails;

  constructor(private http: HttpClient, private notification: NotificationService, private dialog: MatDialog,private _router:Router) { }

  getPatientHeader(patientId){
     const token = localStorage.getItem('token');
     return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Doctor-ID': localStorage.getItem('doctorId') ? localStorage.getItem('doctorId') : 'temp' ,
      'X-Reception-ID':localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Patient-ID' : patientId,
      Authorization: `Bearer ${token}`
    });

  }

  /* Submit patient details */
  patientCreate(patientObj, signupType: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Doctor-ID': localStorage.getItem('doctorId') ? localStorage.getItem('doctorId') : 'temp' ,
      'X-Reception-ID':localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    if (signupType === 'create') {
      this.createPatient(patientObj, header).subscribe(data => {
        if (data) {
          this.notification.show('Patient added successfully', 'Ok', 8000);
          this.dialog.closeAll();
          this._router.navigate(['/queuemgmt'])
        }
      }, (error) => console.log(error));
    } else {
      this.updatePatient(patientObj, this.getPatientHeader(patientObj._id)).subscribe(data => {
        this.notification.show('Patient Details updated', 'Ok' , 8000) ;
      }, error => console.log(error));
    }
  }

  patientCreateWithRet(patientObj, signupType: string){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Doctor-ID': localStorage.getItem('doctorId') ? localStorage.getItem('doctorId') : 'temp' ,
      'X-Reception-ID':localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    if(signupType === 'create'){
      return this.createPatient(patientObj, header) ;
    }
    else{
      return this.updatePatient(patientObj, this.getPatientHeader(patientObj._id)) ;
    }
  }

  updateContactDetails(data){
    return this.http.patch<any>(`${this.serverUrl}/patient/contact`, data, {headers : this.getPatientHeader(data._id)}) ;
  }

  readPatientDetailsById(patientId){
    return this.getPatientdetailById(this.getPatientHeader(patientId)) ;
  }


  /* Get Patient Details */
  readPatientDetails(patientObj) {
    return this.getPatientDetails(patientObj);
  }

  /* Search Patient Details */
  searchPatient(terms: Observable<string>) {
      return terms.pipe(debounceTime(400)
      , distinctUntilChanged()
      , switchMap(term => this.getPatientDetails({search_term: term})));
  }

  /* Patient API's */
  getPatientDetails(data): Observable<any> {
    if (data.search_term !== '') {
      const token = localStorage.getItem('token');
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Clinic-ID': localStorage.getItem('clinicId'),
        'X-Doctor-ID': localStorage.getItem('doctorId') ? localStorage.getItem('doctorId') : 'temp' ,
        'X-Reception-ID':localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
        Authorization: `Bearer ${token}`
      });
      return this.http.post<any>(`${this.serverUrl}/patient/read`, data, { headers: header });
    } else {
      // return new EmptyObservable();
      return empty() ;
    }
  }
  updatePatient(data, header): Observable<any> {
    return this.http.patch<any>(`${this.serverUrl}/patient/patch`, data, { headers: header });
  }
  createPatient(data, header): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/patient/create`, data, { headers: header });
  }
  getPatientdetailById(header): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/patient/read-id`, {headers: header}) ;
  }
}
