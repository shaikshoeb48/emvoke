import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-no-clinic-found',
  templateUrl: './no-clinic-found.component.html',
  styleUrls: ['./no-clinic-found.component.scss']
})
export class NoClinicFoundComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onGoBack(){
    this.authService.signOut()
  }
}
