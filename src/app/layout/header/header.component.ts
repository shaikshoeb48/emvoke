import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AuthService } from './../../core/services/auth.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
import { ProfileComponent } from '../profile/profile.component';
import { ShareService } from 'src/app/share.service'
import { SecureStorageService } from 'src/app/core/services/secure-storage.service';
import { SidebarService } from '../sidebar';
import { Subscription } from 'rxjs';
import { ViewDoctorComponent } from './../../doctor/view-doctor/view-doctor.component';


export interface BreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  userName: string;
  breadcrumbs$;
  profileLogo;
  doctorData: any;
  clinicInfo;
  singleRoleClinics;
  multipleRoleClinics;
  checkSwitchClinic = 0;
  currentClinic = {
    "clinicName": null,
    "clinicRoll": null
  }
  doctorLinkSub :Subscription
  // paymentPending = false;
  @Input() paymentPending?: boolean = false;
  constructor(private auth: AuthService, private dialog: MatDialog,
    private share: ShareService, private secureStorage: SecureStorageService) {


    this.getProfileImg();
    if (window.matchMedia('screen and (max-width: 768px)').matches) {
      const body = document.querySelector('body');
      body.classList.remove('nav-md');
      body.classList.add('nav-sm');
    }

    this.singleRoleClinics = []
    this.multipleRoleClinics = []
  }

  ngOnInit() {

    this.getCurrentClinic();
    this.share.doctorlinkUpdateCheck$.subscribe((data)=>{
      if(data.length > 0){
        this.auth.getUserPermissions().subscribe((result) =>{
          if(result.Data){
            const rawData = atob(result.Data)
            if(rawData.length){
              const userPermission = JSON.parse(rawData)
              const clinicInfo = userPermission.clinic_info
              this.secureStorage.set('clinicInfo',JSON.stringify(clinicInfo))
              this.getCurrentClinic()
            }
          }

        })
      }

    })
  }

  onSchedule(){
    const doctorId = localStorage.getItem('doctorId') ;
    const dialogRef = this.dialog.open(ViewDoctorComponent, {
      width: '1100px',
      data: { type: 'dashboard', doctorId: doctorId, status: 'active' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed");
    });
  }

  getCurrentClinic() {
    let currentClinicId = localStorage.getItem('clinicId')
    let currentRole = localStorage.getItem('roles')
    this.currentClinic.clinicRoll = currentRole
    if(this.secureStorage.get('clinicInfo').length){
      this.clinicInfo = JSON.parse(this.secureStorage.get('clinicInfo'))
      this.sortClinics(currentClinicId)

    }
  }

  sortClinics(currentClinicId) {
    this.multipleRoleClinics = []
    this.singleRoleClinics = []
    this.clinicInfo.forEach((c) => {
      this.checkSwitchClinic += 1
      if (c.clinic_id == currentClinicId) {
        this.currentClinic.clinicName = c.clinic_name
      }

      if (c.clinic_roles.length > 1) {
        this.checkSwitchClinic += 1

        this.multipleRoleClinics.push(c)
      }
      else {
        this.singleRoleClinics.push(c)
      }



    })
    console.log(this.checkSwitchClinic)
  }



  toggleClicked(event: MouseEvent): void {
    const body = document.querySelector('body');
    const menu = document.querySelector('#sidebar-menu');
    if (body.classList.contains('nav-md')) {
      body.classList.remove('nav-md');
      body.classList.add('nav-sm');
    } else {
      body.classList.remove('nav-sm');
      body.classList.add('nav-md');
    }
  }

  async getProfileImg() {
    const role = localStorage.getItem('roles');
    if (role === 'admin') {
      this.share.clinicData.subscribe((a) => {
        if (a.logo) {
          this.share.imageDataSh.subscribe((logo) => {
            this.profileLogo = logo.data
            //   console.log("yes got prof it is clinic")
          })
        }
      })
    } else if (role == 'reception') {
      this.share.clinicData.subscribe((a) => {
        // console.log(a.logo)
        if (a.logo) {
          this.share.imageDataSh.subscribe((logo) => {
            this.profileLogo = logo.data
            //  console.log("yes got prof it is recep")
          })
        }
      })
    } else if (role === 'doctor') {
      const doctorId = localStorage.getItem('doctorId')
      const subs = this.auth.readDoctorDetails(doctorId);
      if (subs) {
        (await subs).subscribe((a) => {
          this.doctorData = JSON.parse(atob(a.Data));
          if (this.doctorData.picture) {
            this.auth.getDrLogo().subscribe((data) => {
              if (data) {
                // console.log("yes got prof it is dr")
                this.share.updateDrImageData(data);
              }
            })
          }
          this.share.DrImageData.subscribe((logo) => {
            this.profileLogo = logo.data;
          })
        })
      }

    }
  }

  toggleAccordion(event, index) {
    event.stopPropagation();
    let listLength = this.multipleRoleClinics.length

    for (let i = 0; i < listLength; i++) {
      if (i !== index) {
        let collapsable = document.getElementById('collapse' + i)
        let classList = collapsable.classList;
        if (classList.contains('collapse.show')) {
          classList.replace('collapse.show', 'collapse');
        }
      }

    }
    const collapsable = document.getElementById('collapse' + index);
    const classList = collapsable.classList;
    if (classList.contains('collapse')) {
      classList.replace('collapse', 'collapse.show');
    } else if (classList.contains('collapse.show')) {
      classList.replace('collapse.show', 'collapse');
    }
  }

  onGetUserChangeData(clinic, role) {
    if(clinic.clinic_name == this.currentClinic.clinicName && role == this.currentClinic.clinicRoll ){
      return
    }
    this.currentClinic.clinicName = clinic.clinic_name;
    this.currentClinic.clinicRoll = role
    this.sortClinics(clinic.clinic_id);

    this.auth.switchUserRole(clinic, role)
  }

  onLogout(): void {
    this.auth.signOut();
  }

  onProfile() {
    const dialogRef = this.dialog.open(ProfileComponent, {


    });
    dialogRef.afterClosed().subscribe(result => {

    }, error => console.log('header profile error', error));
  }



}
