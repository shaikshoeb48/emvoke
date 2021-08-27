import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {
  @Output() notifyNext = new EventEmitter();
  data = {
    policy: {
      sms: false,
      alerts: false
    }
  }

  check(val, ev) {
    this.data.policy[val] = ev.checked;
  }

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.notifyNext.emit({index: -1, key: 'policy', data: this.data, type: 'submit'});
  }

}
