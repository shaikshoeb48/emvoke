import { Component, OnInit,HostListener} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from './../../core/models/user.model';
import { AuthService } from './../../core/services/auth.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html'
})
export class ConfirmCodeComponent implements OnInit {

  email = user.confirm.email; //localStorage.getItem('user.confirm.email');
  confirmForm: FormGroup;
  submitted = false;
  formOneClass: string;

  constructor(private fB: FormBuilder, private auth: AuthService, private router: Router) { 
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log("Refresh alert...");
    event.returnValue = false;
    window.opener.location.reload();
}


  ngOnInit() {
    this.createForm();
    console.log(this.email);
    if(!this.email){
      this.router.navigate(['signup'])
    }
  }

  createForm() {
    this.confirmForm = this.fB.group({
      email: [{ value: this.email, disabled: true }, Validators.required],
      code: ['', Validators.compose([Validators.required, Validators.min(3)])]
    });
  }

  isFieldValid(field): boolean {
    return ((!this.confirmForm.get(field).valid && this.confirmForm.get(field).touched)
      || (this.confirmForm.get(field).untouched && this.submitted));
  }

  sendAgain() {
    this.auth.resendSignUp(this.email);
  }

  confirmCode() {
    this.submitted = true;
    this.formOneClass = 'invalid-form';
    if (this.confirmForm.valid) {
      this.auth.confirmSignUp(this.email, this.confirmForm.get('code').value);
    }
  }

  onClickSignUp() {
    //this.auth.clinicCreate(this.signupservice.getobj(), 'create');
    
  }

}
