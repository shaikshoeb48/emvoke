import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MustMatch } from '../../core/helpers/validators';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { NotificationService } from '../../core/services/notification.service' ;

import { AlertComponent } from '../../core/components/alert/alert.component';

@Component({
  selector: 'app-doctor-sign-up',
  templateUrl: './doctor-sign-up.component.html',
  styleUrls: ['./doctor-sign-up.component.scss']
})
export class DoctorSignUpComponent implements OnInit {

  formOneGrp: FormGroup;
  formTwoGrp: FormGroup;
  formThreeGrp: FormGroup;
  medPracticeList: FormArray;
  educationList: FormArray;
  certificationList: FormArray;
  isFormOneSubmitted = false;
  isFormTwoSubmitted = false;
  isFormThreeSubmitted = false;
  formOneClass: string;
  formTwoClass: string;
  formThreeClass: string;
  menuType: string;
  ctryCodes = ['+91', '+90', '+99'];
  specialities = [
    {
      value: 'surgeon',
      name: 'Surgeon'
    },
    {
      value: 'heartspecialist',
      name: 'Heart Specialist'
    }
  ];
  specializations = [
    {
      value: 'bds',
      name: 'BDS'
    },
    {
      value: 'general',
      name: 'General'
    }
  ];
  mcouncils = [
    {
      value: 'council1',
      name: 'Council1'
    },
    {
      value: 'council2',
      name: 'Council2'
    }
  ];
  contact_details = [
    {
      phone_type : 'mobile',
      phone_number : '',
      country_code : '+91'
    }
  ];
  @Input() type: string;
  @ViewChild('stepper') stepper: MatStepper;
  stepIndex = 0;

  constructor(private fB: FormBuilder, private authService: AuthService,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private alertDialog: MatDialog, private router: Router, private notification: NotificationService) {

    this.authService.doctorStepperSub.subscribe((value) => {
      this.stepIndex = value;
      this.stepper.next();
    });
  }

  closeModal() {
    // this.shareService.updateClinicData(this.allClinicData) ;
    this.alertDialog.closeAll();
  }

  ngOnInit() {

    this.getMenuType();

    this.formOneGrp = this.fB.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      confirmPwd: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPwd')
    });


    this.formTwoGrp = this.fB.group({
      date_of_birth: ['', Validators.required],
      gender: ['', Validators.required],
      registration_details: this.fB.array([this.createMedPracticeDet()]),
      specialization: ['', Validators.required],
      speciality: ['', Validators.required]
    });

    this.formThreeGrp = this.fB.group({
      education_details: this.fB.array([this.createEducationDet()]),
      cerfication_details: this.fB.array([this.createCertificationDet()]),
      years_of_experience: 0,
      doctor_terms_condition: ['', Validators.required]
    });

    this.medPracticeList = this.formTwoGrp.get('registration_details') as FormArray;
    this.educationList = this.formThreeGrp.get('education_details') as FormArray;
    this.certificationList = this.formThreeGrp.get('cerfication_details') as FormArray;
  }

  /* Add multiple medical practice details */
  createMedPracticeDet(): FormGroup {
    return this.fB.group({
      council: ['', Validators.compose([Validators.required])],
      number: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])]
    });
  }

  /* CHECK A DOCTOR ALREADY EXIST OR NOT IN DATABASE */
  isDoctorExist() {
    if (this.formOneGrp.get('email').valid) {
      const email = this.formOneGrp.value.email.toLowerCase();
      this.authService.doctorExist(email).subscribe(result => {
        if (result.Data) {
          const data = atob(result.Data);
          const doctorData = JSON.parse(data);
          const dialogRef = this.alertDialog.open(AlertComponent, {
            width: '500px',
            data: {
              title: 'Doctor Already Exist',
              message: 'A doctor with same email already exist do you want to link with your clinic',
              button1: 'Yes',
              button2: 'No',
              extra: {
                'Name': doctorData.first_name + ' ' + doctorData.last_name,
                'Email': doctorData.email
              }
            }
          });

          dialogRef.afterClosed().subscribe(dialogRes => {
            if (dialogRes == 'okay') {
              this.alertDialog.closeAll()
              this.authService.linkDoctorWithClinic(doctorData._id);
              this.router.navigate(['']);
            }
            else {
              console.log('No')
            }
          });
        }
      },
        (error) => {
          // console.log('Doctor exist error' , error) ;
          if (error.statusText == "Not Found") {
            return EMPTY;
          }
        }
      );
    }
    else {
      console.log('false');
    }
  }

  updateContact(value, index, type){
    this.contact_details[index][type] = value ;
  }

  checkContactValid(){
    let index = this.contact_details.length - 1;

    const phone_number = this.contact_details[index].phone_number ;
    const phone_type = this.contact_details[index].phone_number ;
    const country_code = this.contact_details[index].country_code ;

    return (phone_number && phone_type && country_code) ;
  }

  addContact(){
    if(this.checkContactValid()){
      this.contact_details.push({
        phone_type : 'mobile',
        phone_number : '',
        country_code : '+91'
      }) ;
    }
    else{
      this.notification.show("Please fill existing contact detials first", "OK", 5000) ;
    }
  }

  removeContact(index){
    if(this.contact_details.length > 1){
      this.contact_details.splice(index,1) ;
    }
    else{
      this.notification.show("Atleast one contact detail is required", "OK", 5000) ;
    }
  }

  addMedPracticeDet() {
    this.medPracticeList.push(this.createMedPracticeDet());
  }

  removeMedPracticeDet(index) {
    if (index !== 0) {
      this.medPracticeList.removeAt(index);
    }
  }

  /* Add multiple education details */
  createEducationDet(): FormGroup {
    return this.fB.group({
      college: ['', Validators.compose([Validators.required])],
      university: ['', Validators.compose([Validators.required])],
      degree: ['', Validators.compose([Validators.required])],
      passing_year: ['', Validators.compose([Validators.required])]
    });
  }

  addEducationDet() {
    this.educationList.push(this.createEducationDet());
  }

  removeEducationDet(index) {
    if (index !== 0) {
      this.educationList.removeAt(index);
    }
  }

  /* Add multiple certification details */
  createCertificationDet(): FormGroup {
    return this.fB.group({
      certName: '',
      certYear: '',
    });
  }

  addCertificationDet() {
    this.certificationList.push(this.createCertificationDet());
  }

  removeCertificationDet(index) {
    if (index !== 0) {
      this.certificationList.removeAt(index);
    }
  }

  /* Get Type of screen */
  getMenuType() {
    if (this.dialogData) {
      this.menuType = this.dialogData.type;
    } else if (this.type) {
      this.menuType = this.type;
    } else {
      this.menuType = '';
    }
  }

  isFirstFormValid(field): boolean {
    return ((!this.formOneGrp.get(field).valid && this.formOneGrp.get(field).touched)
      || (this.formOneGrp.get(field).untouched && this.isFormOneSubmitted));
  }

  isSecondFormValid(field): boolean {
    return ((!this.formTwoGrp.get(field).valid && this.formTwoGrp.get(field).touched)
      || (this.formTwoGrp.get(field).untouched && this.isFormTwoSubmitted));
  }

  isThirdFormValid(field): boolean {
    return ((!this.formThreeGrp.get(field).valid && this.formThreeGrp.get(field).touched)
      || (this.formThreeGrp.get(field).untouched && this.isFormThreeSubmitted));
  }

  onSubmitFormOne() {
    this.isFormOneSubmitted = true;
    this.formOneClass = 'invalid-form';
    let lowerCaseEmail = this.formOneGrp.get('email').value.toLowerCase();
    this.formOneGrp.get('email').setValue(lowerCaseEmail);
    const obj = {...this.formOneGrp.value,
           contact_details : this.contact_details,
           phone_number: this.contact_details[0].phone_number,
           countryCode : this.contact_details[0].country_code
         }
    console.log(obj) ;

    if (this.formOneGrp.valid && this.checkContactValid()) {
      this.authService.doctorSignup(obj);
      console.log(obj);
    }
    else{
      this.notification.show("Invalid Form", "OK", 5000) ;
    }
  }

  onSubmitFormTwo() {
    this.isFormTwoSubmitted = true;
    this.formTwoClass = 'invalid-form';
    if (this.formTwoGrp.valid && this.stepIndex) {
      this.stepper.selectedIndex = 2;
    }
  }

  doctorSignup() {
    this.isFormThreeSubmitted = true;
    this.formThreeClass = 'invalid-form';
    if (this.formTwoGrp.valid && this.formThreeGrp.valid) {
      this.authService.doctorCreate(Object.assign({}, this.formTwoGrp.value, this.formThreeGrp.value), 'update');
      if (this.authService.imageData) {
        console.log("came inside signup")
        this.authService.uploadDrImg().subscribe((data) => {
          console.log(data);
          console.log("yes send from dr ");
          this.authService.imageData = "";
        },
          error => {
            console.log(error);

          });
      }
    }
  }

}
