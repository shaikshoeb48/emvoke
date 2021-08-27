import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../core/helpers/validators';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']

})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  forgotSubmitForm: FormGroup;
  submitted = false;
  submitted1 = false;
  isForgotSubmit = false;
  email: string;

  constructor(private fB: FormBuilder, private auth: AuthService, private location: Location,private notification: NotificationService) { }

  ngOnInit() {
    this.createForm();
    this.createForgotSubmitForm();
  }

  createForm() {
    this.forgotForm = this.fB.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  createForgotSubmitForm() {
    this.forgotSubmitForm = this.fB.group({
      email: [{ value: '', disabled: true }, Validators.required],
      code: ['', Validators.compose([Validators.required, Validators.min(3)])],
      password: ['', Validators.required],
      confirmPwd: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPwd')
      });
  }

  isFieldValid(field): boolean {
    return ((!this.forgotSubmitForm.get(field).valid && this.forgotSubmitForm.get(field).touched)
      || (this.forgotSubmitForm.get(field).untouched && this.submitted1));
  }

  isFieldValid1(field): boolean {
    return ((!this.forgotForm.get(field).valid && this.forgotForm.get(field).touched)
      || (this.forgotForm.get(field).untouched && this.submitted));
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgotForm.valid) {
      this.auth.forgotPassword(this.forgotForm.get('email').value.toLowerCase()).then(data => {
        console.log('Forgot Password Success', data);
        this.email = this.forgotForm.get('email').value.toLowerCase();
        this.isForgotSubmit = true;
        this.forgotSubmitForm.get('email').setValue(this.email);
        // this.notification.show("If there's a Clinicplush account connected to this email address, we'll email you password reset code.If you don't receive the email, please try again and make sure you enter the email address associated with your Clinicplush account.", 'Ok', 8000);

      })
        .catch(err => {
          console.log('Forgot Password Error', err);
          this.isForgotSubmit = false;
        });
    }
  }

  onForgotSubmit() {
    this.submitted1 = true;
    if (this.forgotSubmitForm.valid) {
      const email = this.email;
      const code = this.forgotSubmitForm.get('code').value;
      const password = this.forgotSubmitForm.get('password').value;
      this.auth.forgotPasswordSubmit(email, code, password);
    }
  }

  goBack(): void {
    this.location.back();
  }

}
