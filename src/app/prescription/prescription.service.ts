import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class PrescriptionService {

snomedServerUrl = `${environment.snomedUrl}` ;
private selectedValue = new BehaviorSubject<string>('symptoms');
selected = this.selectedValue.asObservable() ;

private patientData = new BehaviorSubject<any>({}) ;
patientDataVal = this.patientData.asObservable() ;

private doctorData = new BehaviorSubject<any>({}) ;
doctorDataVal = this.doctorData.asObservable() ;

serverUrl = `${environment.baseUrl}`;
baseUrl = `${environment.baseParameter}`  ;

  constructor(private http: HttpClient) { this.snomedServerUrl; }

  setSelected(value){
    this.selectedValue.next(value);
  }

  setPatientData(data){
    this.patientData.next(data) ;
  }

  setDoctorData(data){
    this.doctorData.next(data) ;
  }

  getPrescriptionHeader(){
  	return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }

  getSnomedHeader(){
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Accept-Language": "en-X-900000000000509007,en-X-900000000000508004,en"
    });
  }

  getMedicineHeader(){
   return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      'X-Reception-ID':localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }); 
  }

   getDoctorHeader(doctorId,date) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Doctor-ID': doctorId,
      'X-Date'     : date,
      'X-Reception-ID':localStorage.getItem('receptionId')?localStorage.getItem('receptionId') : 'temp',
      Authorization: `Bearer ${token}`
    });
  }

  getReadDoctorHeader(doctorId?: string){
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Doctor-ID': doctorId ? doctorId : localStorage.getItem('doctorId'),
      Authorization: `Bearer ${token}`
    });
  }

  getDoctorDetails(doctorId): Observable<any>{
    return this.http.get<any>(`${this.serverUrl}${this.baseUrl}/doctor/read`, { headers: this.getReadDoctorHeader(doctorId) });
  }

  searchMedicine(term): Observable<any>{
    const data = {'search_term' : term } ;
    return this.http.post<any>(`${this.serverUrl}medicine/search`, data , {headers : this.getMedicineHeader()}) ;
  }

  readPrescriptionData(data){
  	return this.getPrescriptonData(data , this.getSnomedHeader()) ;
  }

  createUrl(term , semanticTag , limit){
  	// const url = `search?term=${term}&state=active&semantictag=${semanticTag}&acceptability=preferred&returnlimit=${limit}&groupbyconcept=false&refsetid=null&parentid=null` ;
  	// return url ;
    const url = `descriptions?term=${term}&active=true&semanticTag=${semanticTag}&conceptActive=true&groupByConcept=false&searchMode=STANDARD&offset=0&limit=${limit}` ;
    return url ;
  }

  getPrescriptonData(data , header): Observable<any> {
  	return this.http.get<any>(`${this.snomedServerUrl}browser/MAIN/${this.createUrl(data.term , data.semanticTag , 10)}`, { headers: header }) ;
  }

  getSnomedChildren(sctid): Observable<any> {
    return this.http.get<any>(`${this.snomedServerUrl}browser/MAIN/concepts/${sctid}/children?form=stated`, {headers: this.getSnomedHeader()}) ;
  }

  getICD10Map(sctid): Observable<any>{
    return this.http.get<any>(`${this.snomedServerUrl}MAIN/members?referenceSet=447562003&referencedComponentId=${sctid}&active=true&limit=10`, {headers: this.getSnomedHeader()}) ;
  }

   readAppointmentDetailsByDoctor(header):Observable<any>{
     return this.http.get<any>(`${this.serverUrl}${this.baseUrl}/appointment/per-doctor`, { headers: header });
   }
}
