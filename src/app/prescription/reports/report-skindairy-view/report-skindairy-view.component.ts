import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-report-skindairy-view',
  templateUrl: './report-skindairy-view.component.html',
  styleUrls: ['./report-skindairy-view.component.scss']
})
export class ReportSkindairyViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  item;

  ngOnInit(): void {
    if (this.data["type"] == "skindairy") {
      this.item = this.data["item"]
    }
  }

}
