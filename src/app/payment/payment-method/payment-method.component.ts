import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  creditForm: FormGroup;
  isCreditFormSubmitted = false;

  constructor(private fB: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createCreditCardForm();
  }

  createCreditCardForm() {
    this.creditForm = this.fB.group({
      cardNo: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
      cardName: ['', Validators.compose([Validators.required, Validators.min(2)])],
    });
  }

  isFieldValid(field): boolean {
    return ((!this.creditForm.get(field).valid && this.creditForm.get(field).touched)
      || (this.creditForm.get(field).untouched && this.isCreditFormSubmitted));
  }

  onSubmitCreditDetails() {
    this.isCreditFormSubmitted = true;
    if (this.creditForm.valid) {
      console.log(this.creditForm.value);
      this.router.navigate(['/paymentsuccess']);
    }
  }

}
