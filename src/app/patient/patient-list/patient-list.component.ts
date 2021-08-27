import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patientData = [];
  filteredArray;

  constructor(private httpService: HttpClient) {
    this.getPatientData();
  }

  ngOnInit() {
  }

  getPatientData() {
    // this.httpService.get('http://localhost:4200/assets/queuedata.json').subscribe((data: QueueMgmt[]) => {
    //   const x = data.map(p => p.patients);
    //   this.patientData =  [].concat(...x);
    // });
  }
}
