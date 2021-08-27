import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class SidebarService {
  menuItems = [
    {
      menuName: 'Dashboard',
      menuUrl: 'dashboard',
      menuIcon: 'fa fa-tachometer',
      menuId: 'dashboard',
      subMenus: [
      ]
    },
    {
      menuName: 'Patients',
      menuUrl: '',
      menuIcon: 'fa fa-wheelchair',
      menuId: 'patient',
      subMenus: [
        {
          subMenuName: 'Search Patient',
          subMenuUrl: 'patient/patientsearch',
        },
        {
          subMenuName: 'Add New Patient',
          subMenuUrl: 'patient/addpatient',
        },
        {
          subMenuName: 'Bulk Add Patient',
          subMenuUrl: 'patient/bulkpatient',
        }
      ]
    },
    {
      menuName: 'Queue Manangement',
      menuUrl: 'queuemgmt',
      menuIcon: 'fa fa-user',
      menuId: 'queue',
      subMenus: [
      ]
    },
    {
      menuName: 'Doctors',
      menuUrl: '',
      menuIcon: 'fa fa-user',
      menuId: 'doctor',
      subMenus: [
        {
          subMenuName: 'Add Doctor',
          subMenuUrl: 'doctor/adddoctor',
        },
        {
          subMenuName: 'Doctor List',
          subMenuUrl: 'doctor/doctorlist',
        }
      ]
    },
    {
      menuName: 'Appointment',
      menuUrl: '',
      menuIcon: 'fa fa-calendar',
      menuId: 'appointment',
      subMenus: [
        {
          subMenuName: 'Book Appointment',
          subMenuUrl: 'appointment/bookappointment'
        },
        {
          subMenuName: 'Appointment Calendar',
          subMenuUrl: 'appointment/appointmentCal'
        }
      ]
    },
    {
      menuName: 'Billing',
      menuUrl: '',
      menuIcon: 'fa fa-money',
      menuId: 'billing',
      subMenus: [
        {
          subMenuName: 'Add Billing',
          subMenuUrl: 'billing/addbilling'
        },
        {
          subMenuName: 'Billing History',
          subMenuUrl: 'billing/billinghistory'
        }
      ]
    },
    {
      menuName: 'Reports and Analytics',
      menuUrl: 'fsdfds',
      menuIcon: 'fa fa-book',
      menuId: 'reports',
      subMenus: [
      ]
    },
    {
      menuName: 'Notification and Alerts',
      menuUrl: 'fsdfds',
      menuIcon: 'fa fa-book',
      menuId: 'reports',
      subMenus: [
      ]
    }
  ];

  serverUrl = `${environment.baseUrl}`;

  constructor(private authService: AuthService) { }

  getMenuItems() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('roles');
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      //'X-Clinic-ID': localStorage.getItem('clinicId'),
      Authorization: `Bearer ${token}`
    });
    //console.log("ROLE", role)
    switch(role){
      case 'admin':
        header = header.append('X-Clinic-ID', localStorage.getItem('clinicId'));
        break;
      case 'doctor':
        header = header.append('X-Doctor-ID', localStorage.getItem('doctorId'));
        break;
      case 'reception':
        header = header.append('X-Reception-ID', localStorage.getItem('receptionId'));
        break;  
    }
    return this.authService.getUi(header)
  }
}
