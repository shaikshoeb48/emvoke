import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { BehaviorSubject,Observable } from 'rxjs' ;
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class GrowthService {

  baseUrl = environment.baseUrl ;
  baseParameter = environment.baseParameter ;
  URL = `${this.baseUrl}${this.baseParameter}` ;
  childGrowthSource = new BehaviorSubject<any>(
    [
  		{ weight : {value : 10, unit : 'kg'} , height : {value : 60, unit : 'cm'}, ofc: null , appointment_date : "2020-06-26"},
  		{ weight : {value : 15, unit : 'kg'} , height : {value : 75, unit : 'cm'}, ofc : null , appointment_date : "2020-08-10"},
  	]
    ) ;

  serverUrl = `${environment.baseUrl}${environment.baseParameter}`;

  childGrowthData = this.childGrowthSource.asObservable() ;

  constructor(private http: HttpClient) { }


  getPatientChildDevelopmentFormData(): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Patient-ID' : localStorage.getItem('patient_id'),
      'X-Doctor-ID' : localStorage.getItem('doctorId'),
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${this.serverUrl}/patient/child-development-data`, { headers: header });

  }


  updateChildDevelopmentExaminationForm(data): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Doctor-ID': localStorage.getItem('doctorId') ? localStorage.getItem('doctorId') : 'temp' ,
      'X-Reception-ID':localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Patient-ID' : localStorage.getItem('patient_id'),
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.patch<any>(`${this.serverUrl}/patient/patch`, data, { headers: header });
  }

  getGrowthHeaders(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID':  localStorage.getItem('clinicId'),
      'X-Patient-ID': localStorage.getItem('patient_id'),
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'X-Doctor-ID' : localStorage.getItem('doctorId') ? localStorage.getItem('doctorId') : 'temp'
    });
  }

  getChildGrowthData(){
    return this.http.get<any>(`${this.URL}/appointment/growth-vitals`, {headers : this.getGrowthHeaders()}) ;
  }
}

