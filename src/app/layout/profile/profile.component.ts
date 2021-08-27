import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from 'src/app/core/services/auth.service';
import { ShareService } from 'src/app/share.service';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
//import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
// import moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editEnable = true;
  FirstFormEnable = true;
  SecondFormEnable = false;
  ThirdFormEnable = false;
  clinicDetails;
  roleBasedForm: boolean;
  updatedClinicDetails = {};
  updatedDrDetails = {}
  drDetails;
  DrBoolObj = {
    first_name: false,
    middle_name: false,
    last_name: false,
    bio: false,
    date_of_birth: false,
    years_of_experience: false,
    doctor_modules: false,
    registration_details: false,
    education_details: false,
    social_handles: false,
    contact_details: false
  };
  clinicBoolObj = {
    name: false,
    speciality: false,
    address: false,
    contact_details: false,
    social_handle: false
  }
  newValues;
  isClinicDataLoaded = false;
  enableUpload = false;






  /* tsett */

  formOneGrp: FormGroup;
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
  //educationList: FormArray;
  medPracticeList: FormArray;
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
  // phoneTypes = [
  //   {
  //     value: 'mobile',
  //     name: 'Mobile'
  //   },
  //   {
  //     value: 'telephone',
  //     name: 'Telephone'
  //   }
  // ];
  // CountryCodes = [
  //   {
  //     value: '+91',
  //     name: '+91'
  //   },
  //   {
  //     value: '+90',
  //     name: '+90'
  //   },
  //   {
  //     value: '+99',
  //     name: '+99'
  //   }
  // ]







  constructor(private _snackBar: MatSnackBar, private datepipe: DatePipe, private auth: AuthService, @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any, private dialog: MatDialog, public dialogRef: MatDialogRef<ProfileComponent>, private share: ShareService, private fB: FormBuilder) {
    const role = localStorage.getItem('roles')

    if (role === 'admin' || role === 'reception') {
      this.getClinic()
      //  console.log("role is admin or reception")
    }
    if (role === 'doctor') {
      this.readDr();
      //  console.log("role is dr ")
    }

  }



  ngOnInit() {
    this.formOneGrp = this.fB.group({
      first_name: new FormControl({ value: '', disabled: true }, Validators.required),
      middle_name: new FormControl({ value: '', disabled: true }, Validators.required),
      last_name: new FormControl({ value: '', disabled: true }, Validators.required),
      // specialization: ['', Validators.required],
      bio: new FormControl({ value: '', disabled: true }, Validators.required),
      date_of_birth: new FormControl({ value: '', disabled: true }, Validators.required),
      years_of_experience: new FormControl({ value: 0, disabled: true }, Validators.required),
      doctor_modules: new FormControl({ value: '', disabled: true }, Validators.required),

    });


    const role = localStorage.getItem('roles');
    if (role === 'admin' || role === 'reception') {
      this.roleBasedForm = true;
    } else if (role === 'doctor') {
      this.roleBasedForm = false;
    }
  }

  //  triggerUpload(){
  //    this.enableUpload = true;
  //  }
  addEducationDet() {
    const obj = {
      college: '',
      university: '',
      degree: '',
      passing_year: '',
      address: '',
      specialization: ''
    }
    this.drDetails.education_details.push(obj);
    //  console.log(this.drDetails.education_details);
  }

  updateEduDet(value, index, field) {
    this.drDetails.education_details[index][field] = value;
    //  console.log(this.drDetails.education_details);
    this.DrBoolObj.education_details = true;
    //  console.log(this.DrBoolObj.education_details)
  }

  removeEduDet(index) {
    if (index !== 0) {
      this.drDetails.education_details.splice(index, 1);
      this.DrBoolObj.education_details = true;
    }
  }

  addMedPracDet() {
    const obj = {
      council: '',
      number: '',
      date: ''
    }
    this.drDetails.registration_details.push(obj);
    //  console.log(this.drDetails.registration_details);
  }

  
  addContact() {
    const obj = {
      phone_type: 'mobile',
      phone_number: '',
      country_code: '+91'
    }
    this.drDetails.contact_details.push(obj);
  }

  updateContactDet(value, index, field) {
    this.drDetails.contact_details[index][field] = value;
    this.DrBoolObj.contact_details = true;
  }
  


  updateRegDet(value, index, field) {
    if (field == 'date') {
      let date = this.datepipe.transform(value, 'yyyy-MM-dd')
      this.drDetails.registration_details[index][field] = date;
      console.log(this.drDetails.registration_details);
      this.DrBoolObj.registration_details = true;
    } else {
      this.drDetails.registration_details[index][field] = value;
      this.DrBoolObj.registration_details = true;
    }

    // this.drDetails.registration_details[index][field] = value;
    // console.log(this.drDetails.registration_details);

    //  console.log(this.DrBoolObj.registration_details);
  }

  removeRegDet(index) {
    if (index !== 0) {
      this.drDetails.registration_details.splice(index, 1);
      this.DrBoolObj.registration_details = true;
    }
  }
  removeContactDet(index) {
    if (index !== 0) {
      this.drDetails.contact_details.splice(index, 1);
      this.DrBoolObj.contact_details = true;
    }
  }
  removeClinicContactDet(index) {
    if (index !== 0) {
      this.clinicDetails.contact_details.splice(index, 1);
      this.clinicBoolObj.contact_details = true;
    }
  }
  
  

  addSocialHandles() {
    const obj = {
      name: '',
      url_handle: ''
    }
    this.drDetails.social_handles.push(obj);
    //  console.log(this.drDetails.social_handles);
  }
  updateSocialHandles(value, index, field) {
    this.drDetails.social_handles[index][field] = value;
    // console.log(this.drDetails.social_handles);
    this.DrBoolObj.social_handles = true;
    // console.log(this.DrBoolObj.social_handles);
  }
  removeSocialHandles(index) {
    if (index !== 0) {
      this.drDetails.social_handles.splice(index, 1)
    }
  }



  isFirstFormValid(field): boolean {
    return ((!this.formOneGrp.get(field).valid && this.formOneGrp.get(field).touched)
      || (this.formOneGrp.get(field).untouched));
  }
 
  enableFields() {
    this.editEnable = false;
    this.formOneGrp.controls['first_name'].enable();
    this.formOneGrp.controls['middle_name'].enable();
    this.formOneGrp.controls['last_name'].enable();
    this.formOneGrp.controls['bio'].enable();
    this.formOneGrp.controls['date_of_birth'].enable();
    this.formOneGrp.controls['years_of_experience'].enable();
    this.formOneGrp.controls['doctor_modules'].enable();
    console.log(this.clinicDetails.contact_details.phone_number) 
    //if(this.formEnable==true){
    //this.updatedDrDetails['education_details'] = this.drDetails.education_details;
    // }
  }
  disableFields() {
    this.editEnable = true;
  }
  closeModal() {
    this.dialog.closeAll();
  }
  EnableGeneral() {
    this.FirstFormEnable = true;
    this.ThirdFormEnable = false;
    this.SecondFormEnable = false;
  }
  EnableEducational() {
    this.FirstFormEnable = false;
    this.ThirdFormEnable = false;
    this.SecondFormEnable = true;
  }
  EnableAdditional() {
    this.ThirdFormEnable = true;
    this.FirstFormEnable = false;
    this.SecondFormEnable = false;
  }



  /** testttt */


  /* get clinic details*/
  async getClinic() {
    const subs = this.auth.readClinicDetails();
    if (subs) {
      (await subs).subscribe((data) => {
        if (data) {
          const clinicData = atob(data.Data);
          //   const doctorDet = JSON.parse(clinicData).doctors;
          //  const receptionDet = JSON.parse(clinicData).reception;
          this.clinicDetails = JSON.parse(clinicData);
          console.log(this.clinicDetails)
        }
      },
        (error) => console.log(error));
    }

  }
  /* **************end get clinic************ */

  // checkContactValid(){
  //   let index = this.contact_details.length - 1;

  //   const phone_number = this.contact_details[index].phone_number ;
  //   const phone_type = this.contact_details[index].phone_number ;
  //   const country_code = this.contact_details[index].country_code ;

  //   return (phone_number && phone_type && country_code) ;
  // }


  addClinicContact() {
    const obj = {
      phone_type: 'mobile',
      phone_number: '',
      country_code: '+91'
    }
    this.clinicDetails.contact_details.push(obj);
  }

  updateClinicContactDet(value, index, field) {
    this.clinicDetails.contact_details[index][field] = value;
    this.clinicBoolObj.contact_details = true;
  }

  addClinicSocialHandles() {
    const obj = {
      name: '',
      url_handle: ''
    }
    this.clinicDetails.social_handle.push(obj);
    // console.log(this.clinicDetails.social_handle);
  }
  updateClinicSocialHandles(value, index, field) {
    this.clinicDetails.social_handle[index][field] = value;
    // console.log(this.clinicDetails.social_handle);
    this.clinicBoolObj.social_handle = true;
    // console.log(this.clinicBoolObj.social_handle);
  }
  removeClinicSocialHandles(index) {
    if (index !== 0) {
      this.clinicDetails.social_handle.splice(index, 1);
      this.clinicBoolObj.social_handle = true;
    }
  }

  updateClinicFields(event) {
    if ("string" == typeof (event)) {
      this.clinicBoolObj[event] = true;
    } else {
      this.clinicBoolObj[event.target.name] = true;
    }
    // this.updatedClinicDetails[event.target.name] = event.target.value;
    // this.updatedClinicDetails
    // console.log(event.target.value);
  }



  async updateClinicDetails() {
    let newObj = {};
    for (var key in this.clinicBoolObj) {
      if (this.clinicBoolObj[key] === true) {

        newObj = { ...newObj, [key]: this.clinicDetails[key] }
        console.log(this.clinicBoolObj);
     
      }
    }
    // for (var key in this.clinicBoolObj) {
    //   if (this.clinicBoolObj[key] === true) {
    //     //  console.log(this.clinicBoolObj)
    //     //  if(this.clinicBoolObj[key]===this.clinicDetails.social_handle){
    //     this.updatedClinicDetails = { ...this.updatedClinicDetails, [key]: this.clinicDetails.social_handle }
    //     //   console.log(this.updatedClinicDetails)
    //     // }
    //   }
    // }

    //   console.log(Object.assign({ _id: this.clinicDetails._id }, this.updatedClinicDetails));
    console.log(newObj)
    console.log(this.clinicBoolObj)
    console.log(Object.assign({ _id: this.clinicDetails._id }, newObj));
    this.auth.updateClinic(Object.assign({ _id: this.clinicDetails._id }, newObj)).subscribe((data) => {
      console.log(data)
      this._snackBar.open('Changes Saved Suceessfully', 'Ok', {
        duration: 2000,
      }); 
    },
      error => {
        console.log(error)
      })
    await this.share.updateClinicData(Object.assign({ _id: this.clinicDetails._id }, newObj));
  }

  /*********** DR Func*********** */

  updateDrFields(event) {
    // console.log(typeof (event));
    if ("string" == typeof (event)) {
      this.DrBoolObj[event] = true;
    } else {
      this.DrBoolObj[event.target.name] = true;
    }

    //  console.log(event.target.id) 
    // console.log(event)

  }

  onChange(event, field_name) {
    console.log(event.target.value, field_name);
  }

  // }

  updateDrDetails() {

    let newObj = {};

    for (var key in this.DrBoolObj) {
      if (this.DrBoolObj[key] === true) {

        newObj = { ...newObj, [key]: this.drDetails[key] }
        console.log(this.DrBoolObj);
        // if (this.DrBoolObj[key] === this.DrBoolObj.education_details) {
        //   newObj = { ...newObj, [key]: this.drDetails.education_details }
        // } else if (this.DrBoolObj[key] === this.DrBoolObj.registration_details) {
        //   newObj = { ...newObj, [key]: this.drDetails.registration_details }
        // } else if (this.DrBoolObj[key] === this.DrBoolObj.social_handles) {
        //   newObj = { ...newObj, [key]: this.drDetails.social_handles }
        // }
        // else {
        //   newObj = { ...newObj, [key]: this.formOneGrp.get(key).value };
        // }
      }
    }
    console.log(newObj)
    console.log(this.DrBoolObj)
    console.log(Object.assign({ _id: this.drDetails._id }, newObj));
    this.auth.updateDoctor(Object.assign({ _id: this.drDetails._id }, newObj), this.auth.getDoctorHeader()).subscribe((data) => {
      // newObj = ;
      console.log(data);
      this._snackBar.open('Changes Saved Suceessfully', 'Ok', {
        duration: 2000,
      });
    },
      error => {
        console.log(error)
      },
    )
  }

  /*  get Dr details  */
  async readDr() {
    const drId = localStorage.getItem('doctorId')
    const subs = this.auth.readDoctorDetails(drId);
    if (subs) {
      (await subs).subscribe((data) => {
        if (data) {
          const drData = atob(data.Data);
          this.drDetails = JSON.parse(drData);
          console.log(this.drDetails);
        } (error) => console.log(error);
      })
    }

  }
  /*  get dr details ends here  */



  /* upload logo based on role */

  onClick() {
    const role = localStorage.getItem('roles');
    if (role === 'admin' || role === 'reception') {
      if (this.auth.imageData) {
        this.auth.uploadClinicLogo().subscribe(
          (a) => {
            //   console.log(a);
            //   console.log("yes send frm signup");
            this.share.updateImageData({ "data": this.auth.imageData });
            //  console.log(this.auth.imageData);
            this._snackBar.open("Profile Image Updated", "Ok", {
              duration: 2000,
            });
            this.auth.imageData = "";
          },
          error => {
            console.log(error);
          }
        );
        this.enableUpload = false;
        // this.fileUpload.file = false;
      }else{
        this._snackBar.open("please select the image ", "Ok", {
          duration: 2000,
        })
      }
    } else if (role === 'doctor') {
      if (this.auth.imageData) {
        this.auth.uploadDrImg().subscribe(
          (a) => {
            //   console.log(a);
            //  console.log("yes send frm dr");
            this.share.updateDrImageData({ "data": this.auth.imageData })
            //     console.log(this.auth.imageData);
            this._snackBar.open("Profile Image Updated", "Ok", {
              duration: 2000,
            });
            this.auth.imageData = "";
          },
          error => {
            console.log(error);
          }
        );
        this.enableUpload = false;
        //   this.fileUpload.file = false;
      }
    }
  }
  /*///////////////upload fuc end here////////////// */


}