import { Component, OnInit } from '@angular/core';
import { SecureStorageService } from '../../services/secure-storage.service';

@Component({
  selector: 'app-payment-invalid',
  templateUrl: './payment-invalid.component.html',
  styleUrls: ['./payment-invalid.component.scss']
})
export class PaymentInvalidComponent implements OnInit {

  constructor(private secureStorage:SecureStorageService) { }

  ngOnInit() {
    // localStorage.clear();
    // this.secureStorage.clear();
  }
}
