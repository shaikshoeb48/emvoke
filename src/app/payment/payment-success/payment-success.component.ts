import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../../core/models/user.model';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoDashboard() {
    console.log(user.confirm.email);
    this.router.navigate(['']);
  }

}
