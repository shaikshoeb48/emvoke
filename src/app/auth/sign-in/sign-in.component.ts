import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signinForm: FormGroup;
  submitted = false;

  constructor(private fB: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signinForm = this.fB.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.min(6)])]
    });
  }

  isFieldValid(field): boolean {
    return ((!this.signinForm.get(field).valid && this.signinForm.get(field).touched)
      || (this.signinForm.get(field).untouched && this.submitted));
  }

  signIn() {
    this.submitted = true;
    if (this.signinForm.valid) {
      this.auth.signIn(this.signinForm.get('email').value.toLowerCase(), this.signinForm.get('password').value);
    }
  }

}
