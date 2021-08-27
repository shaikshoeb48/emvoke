import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MustMatch } from '../../core/helpers/validators';
import { AuthService } from '../../core/services/auth.service';
import { CountryCodeService } from 'src/app/core/services/country-code.service';

@Component({
  selector: 'app-reception-sign-up',
  templateUrl: './reception-sign-up.component.html',
  styleUrls: ['./reception-sign-up.component.scss']
})
export class ReceptionSignUpComponent implements OnInit {

  formGrp: FormGroup;
  isFormSubmitted = false;
  formClass: string;
  receptionData;
  countryCodeList = [] ;
  visibleCountryCodes = false ;

  constructor(private fB: FormBuilder, private authService: AuthService,
              @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
              private countryCodeService: CountryCodeService) { }

  ngOnInit() {
    this.formGrp = this.fB.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      countryCode: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      confirmPwd: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPwd')
      });

    this.getReceptionDetails();
  }

  getReceptionDetails() {
    if (this.dialogData) {
      this.authService.readReceptionDetails(this.dialogData.receptionId).subscribe((data: any) => {
        if (data) {
          this.receptionData = JSON.parse(atob(data.Data));
        }
      }, (error) => console.log(error));
    }
  }

  onSubmitForm() {
    this.isFormSubmitted = true;
    this.formClass = 'invalid-form';
    let lowerCaseEmail = this.formGrp.get('email').value.toLowerCase();
    this.formGrp.get('email').setValue(lowerCaseEmail);
    if (this.formGrp.valid) {
      this.authService.receptionSignup(this.formGrp.value);
    }
  }

  isFieldValid(field): boolean {
    return ((!this.formGrp.get(field).valid && this.formGrp.get(field).touched)
      || (this.formGrp.get(field).untouched && this.isFormSubmitted));
  }


  searchCountryCode(event?){

    const searchData = event ? event.target.value : '+91' ;

    this.countryCodeService.searchCountryCode(searchData).subscribe(list => {
      this.countryCodeList = list ;
    }, err => console.error(err)) ;
  }

  onCountryCode(){
    this.visibleCountryCodes = true ;
  }

  changeCountryCode(value, inputEl){
    this.visibleCountryCodes = false;
    this.formGrp.controls.countryCode.setValue(value)

  }

}
