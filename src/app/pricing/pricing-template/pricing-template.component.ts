import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PricingService } from '../pricing.service';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../core/services/notification.service';

import { WindowRefService } from '../window-ref.service';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-pricing-template',
  templateUrl: './pricing-template.component.html',
  styleUrls: ['./pricing-template.component.scss'],
  providers: [WindowRefService]
})
export class PricingTemplateComponent implements OnInit {

  plans = [];
  razorpay;
  order_id;
  selelectedPlan;
  amount;
  @ViewChild('razorForm') razorForm: ElementRef;
  @ViewChild('payCont') payCont: ElementRef;
  constructor(private router: Router, private pricingService: PricingService, private notificationService: NotificationService, private winRef: WindowRefService, private auth: AuthService, private ngZone: NgZone) {
    this.razorpay = environment.razoypayId;
  }

  ngOnInit() {
    this.getPlans()
    // this.pricingService.readSubscription().subscribe(res => {
    //   if (res.Data) {
    //     const status = JSON.parse(atob(res.Data)).status;
    //     if ((status == 'ACTIVE') || (status == 'PENDING')) {
    //       this.router.navigate(['queuemgmt']);
    //     } else {
    //       this.getPlans();
    //     }
    //   } else {
    //     this.getPlans();
    //   }

    // },
    // err => {
    //   console.log(err);
    // })
  }

  addDoctors(ev, index) {
    if (ev.target.value) {
      if (ev.target.value == 0) {
        this.plans[index]['additional_doctors'] = 0;
        this.plans[index]['error'] = false;
      } else {
        if (this.isNumber(ev.target.value)) {
          this.plans[index]['additional_doctors'] = Number(ev.target.value);
          this.plans[index]['error'] = false;
        } else {
          this.plans[index]['error'] = true;
        }
      }
    } else {
      this.plans[index]['additional_doctors'] = 0;
    }
  }

  isNumber(val) {
    if (/^[1-9][0-9]*$/.test(val)) {
      return true;
    }

    return false;
  }

  getPlans() {
    this.pricingService.getPlans().subscribe(res => {
      this.plans = JSON.parse(atob(res.Data));
      this.plans.sort((a, b) => (a.plan_price > b.plan_price) ? 1 : -1);
    });
  }

  // redirectToRazorPay() {
  //   this.payCont.nativeElement.innerHTML = `<form id="rFORM" method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
  //   <input type="hidden" name="key_id" value="${this.razorpay}">
  //   <input type="hidden" name="order_id" value="${this.order_id}">
  //   <input type="hidden" name="name" value="Lookplush clinic">
  //   <input type="hidden" name="description" value="${this.selelectedPlan.plan_name} Plan">
  //   <input type="hidden" name="image" value="https://cdn.razorpay.com/logos/BUVwvgaqVByGp2_large.png">
  //   <input type="hidden" name="callback_url" value="http://localhost:9000">
  // <input type="hidden" name="cancel_url" value="http://localhost:9000/pricing">
  // </form>`;
  //   ((this.payCont.nativeElement as HTMLElement).children[0] as HTMLFormElement).submit();
  // }

  payWithRazor(val) {
    console.log(val);
    const options: any = {
      "key": String(this.razorpay),
      "amount": String(this.amount * 100), // amount should be in paise format to display Rs 1255 without decimal point
      "currency": "INR",
      "name": "Lookplush Clinic", // company name or product name
      "description": "",  // product description
      "image": "./assets/hospital-sign.png", // company logo or product image
      "order_id": val, // order_id created by you in backend
      "modal": {
        // We should prevent closing of the form when esc key is pressed.
        "escape": false,
      },
      "notes": {
        // include notes if any
        "test": "testing"
      },
      "theme": {
        "color": "#0c238a"
      }
    };
    console.log(options);
    options.handler = ((response, error) => {
      options.response = response;
      if (response) {

        console.log(response)
        // call api
        // const body = {
        //   "razorpay_payment_id": Stringresponse.razorpay_payment_id,
        //   "razorpay_order_id": response.razorpay_order_id,
        //   "razorpay_signature": response.razorpay_signature
        // };
        this.pricingService.callbackPayment(response).subscribe(res => {
          this.auth.getSubscriptionDetails().then((res) =>{
            this.ngZone.run(() =>
            this.router.navigate(['dashboard'])
          );
          })

          // window.location.reload();

        });
      }
      if (error) {
      }
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);

    rzp.open();
  }

  createOrder(plan) {
    if (!plan.error) {
      this.selelectedPlan = plan;
      let additional_doctors = 0;
      if (plan.additional_doctors) {
        additional_doctors = Number(plan.additional_doctors);
      }
      this.amount = plan['plan_price'] * (Number(plan['min_subscription']) + additional_doctors);

      const body = {
        plan_id: plan['_id'],
        total_payment: plan['plan_price'] * (Number(plan['min_subscription']) + additional_doctors),
        no_of_subscriptions: Number(plan['min_subscription']) + additional_doctors
      }
      this.pricingService.createOrder(body).subscribe(res => {
        this.order_id = JSON.parse(atob(res.Data)).order_id;
        // this.redirectToRazorPay();
        this.payWithRazor(this.order_id);
      },
        err => {
          if (err.error.detail) {
            this.notificationService.show(err.error.detail, 'Ok', 8000);
          }
        });
    }
  }

  logout() {
    this.auth.signOut();
  }

}
