import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { NotificationService } from '../core/services/notification.service';
@Injectable({
  providedIn: "root"
})
export class AppointmentService {

  serverUrl = `${environment.baseUrl}${environment.baseParameter}`;
  constructor(private http: HttpClient, private notification: NotificationService, private dialog: MatDialog) { }

  /* Header Informations */
  getAppointmentHeader(doctor_id, patient_id) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Doctor-ID': doctor_id,
      'X-Patient-ID': patient_id,
      'X-Reception-ID': localStorage.getItem('receptionId') ? localStorage.getItem('receptionId') : 'temp',
      Authorization: `Bearer ${token}`
    });
  }

  getMedicationsHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Doctor-ID': localStorage.getItem('doctorId') ? localStorage.getItem('doctorId') : 'temp',
      'X-Reception-ID': localStorage.getItem('receptionId') ? localStorage.getItem('receptionId') : 'temp',
      Authorization: `Bearer ${token}`
    })
  }

  getAppointmentUpdateHeader(appointment_id, patient_id) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Appointment-ID': appointment_id,
      'X-Reception-ID': localStorage.getItem('receptionId') ? localStorage.getItem('receptionId') : 'temp',
      'X-Doctor-ID': localStorage.getItem('doctorId') ? localStorage.getItem('doctorId') : 'temp',
      'X-Patient-ID': patient_id,
      Authorization: `Bearer ${token}`
    });
  }

  getDoctorSlotHeader(date, doctorId) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Reception-ID': localStorage.getItem('receptionId') ? localStorage.getItem('receptionId') : 'temp',
      'X-Doctor-ID': doctorId,
      'X-Date': date,
      Authorization: `Bearer ${token}`
    });
  }

  getAllAppointmentHeader(patientId) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Clinic-ID': localStorage.getItem('clinicId'),
      'X-Patient-ID': patientId,
      'X-Doctor-ID': localStorage.getItem('doctorId') ? localStorage.getItem('doctorId') : 'temp',
      Authorization: `Bearer ${token}`
    });
  }

  getAllAppointments(patientId) {
    return this.getPatientAllAppointments(this.getAllAppointmentHeader(patientId));
  }

  /* Submit appointment details */
  appointmentCreate(appObj, signupType: string) {
    if (signupType === 'create') {
      appObj = Object.assign({}, appObj, {
        diagnosis: [],
        investigation: [],
        skin_diary: [],
        medicines: [],
        vaccines: [],
        symptoms: [],
        procedures: [],
        findings: [],
        examination_findings: [],
        receptionist_name: localStorage.getItem('Recepname') ? localStorage.getItem('Recepname') : 'temp',
        state_appointment: 'Queue'
      });
      this.createAppointment(appObj, this.getAppointmentHeader(appObj.doctorId, appObj.firstName)).subscribe(data => {
        if (data) {
          this.notification.show(data.Message, 'Ok', 8000);
          this.dialog.closeAll();
        }
      }, (error) => { });
    } else {
      // update appointment details
      return this.updateAppointment(appObj, this.getAppointmentUpdateHeader(appObj._id, appObj.patient_id));
    }
  }



  /* Get Appointment Details */
  readAppointmentDetails(appObj) {
    return this.getAppointmentDetails(appObj, this.getAppointmentUpdateHeader(appObj.appointment_id, appObj.patient_id));
  }

  /* Get Medications */
  getMedications(appObj) {
    return this.searchMedications(appObj, this.getMedicationsHeader());
  }

  getDoctorSlots(date, doctorId) {
    return this.http.get<any>(`${this.serverUrl}/appointment/slots`, { headers: this.getDoctorSlotHeader(date, doctorId) });
  }

  /* Appointment API's */
  getAppointmentDetails(data, header): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/appointment/read`, { headers: header });
  }
  updateAppointment(data, header): Observable<Event> {
    return this.http.patch<Event>(`${this.serverUrl}/appointment/patch`, data, { headers: header });
  }
  createAppointment(data, header): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/appointment/create`, data, { headers: header });
  }

  getPatientAllAppointments(header): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/appointment/patient-all`, { headers: header });
  }

  searchMedications(data, header): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}medicine/search`, data, { headers: header });
  }
}
