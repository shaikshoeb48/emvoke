import { Component, OnInit, OnDestroy,  Renderer2 } from '@angular/core';
import { PrescriptionService } from '../prescription.service';
import { MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver-es';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Report } from './report.model';
import { ReportsService } from './reports.service';
import { interval, Subscription } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { ReportSkindairyCreateComponent } from './report-skindairy-create/report-skindairy-create.component';
import { ReportSkindairyViewComponent } from './report-skindairy-view/report-skindairy-view.component';
import * as moment from 'moment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit, OnDestroy {

  constructor(private prescriptionService: PrescriptionService,
    public dialog: MatDialog, private fb: FormBuilder,
    private reportService: ReportsService,private renderer: Renderer2
  ) { }

  skinDairyItems: any[] = []
  reportItems: Report[] = []
  reportItemsComplete: Report[] = []
  skindairyItemsComplete = []
  patientID;
  patientName;
  reportForm: FormGroup
  reportTags = ["ALL"]
  imageTags = []
  reportSubscription: Subscription;
  skindairySubscription: Subscription;
  reportsSearchText
  skindairySearchText
  onOpenViewModal = false;
  ngOnInit() {

    this.getReportsAndSkinDairy();
    this.checkForNewReportAndSkinDairy()

  }

  checkForNewReportAndSkinDairy() {
    this.reportService.reportData.subscribe((data) => {
      if (Object.keys(data).length) {
        this.reportService.getSingleReport(data.profileId, data._id).subscribe((singleReport) => {
          data.url = singleReport[0].url
          this.reportItems.unshift(data)
        })
      }
    })

    this.reportService.skindairyData.subscribe((data) => {
      if (Object.keys(data).length) {
        this.reportService.getSingleSkinDairy(data.patientId, data.skindairyId).subscribe((res) => {
          let createDate = moment(res[0].create_datetime).format("DD-MMM-YYYY")
          let pos = this.getSkindairyPos(createDate)
          if (pos != -1) {
            this.skindairyItemsComplete[pos]["skindairyItems"].push(res[0])
          }
          else {
            const obj = {
              newdate: createDate,
              skindairyItems: res
            }
            this.skindairyItemsComplete.unshift(obj)
          }
          this.skinDairyItems = [...this.skindairyItemsComplete]
        })
      }
    })
  }


  getReportsAndSkinDairy() {
    this.prescriptionService.patientDataVal.subscribe((data) => {
      let firstName = data.first_name
      let lastName = data.last_name
      if (lastName.length) {
        this.patientName = firstName + " " + lastName;
      }
      else {
        this.patientName = firstName;
      }
      this.patientID = data._id
      this.getReports(this.patientID)
      this.getSkinDairy();
    })
  }

  //reports

  getReports(patiendId) {
    this.reportItems = []
    this.reportService.getReadReports(patiendId)
      .pipe(
        map((data) => {
          return data.sort((a, b) => {
            return new Date(b.report_date).getTime() - new Date(a.report_date).getTime()
          })
        }))
      .subscribe((reportData) => {
        reportData.forEach((singleReport) => {
          singleReport.tags.forEach((tag) => {
            if (this.reportTags.indexOf(tag) == -1) {
              this.reportTags.push(tag.toUpperCase())
            }
          })
          let reportDate = moment(singleReport.report_date).format('DD-MMM-YYYY');

          this.reportItems.push(new Report(singleReport._id, singleReport.profile_id, singleReport.label,
            reportDate, singleReport.lab_info.split("#_#")[0], singleReport.lab_info.split("#_#")[1],
            singleReport.tags, singleReport.url, singleReport.report_type, singleReport.report_for, singleReport.comment,
            singleReport.label.split(".")[1], singleReport.thumbnail))
        });
        this.reportItemsComplete = [...this.reportItems]
      })

    this.getReportsOnInterval();

  }

  getReportsOnInterval() {
    this.reportSubscription = interval(15 * 60 * 1000)
      .pipe(flatMap(() => this.reportService.getReadReports(this.patientID)),
        map((data) => {
          return data.sort((a, b) => new Date(b.report_date).getTime() - new Date(a.report_date).getTime())
        }))
      .subscribe((reportData) => {
        this.reportItems = []
        reportData.forEach((singleReport) => {
          this.reportItems.push(new Report(singleReport._id, singleReport.profile_id, singleReport.label,
            singleReport.report_date, singleReport.lab_info.split(" ")[0], singleReport.lab_info.split(" ")[1],
            singleReport.tags, singleReport.url, singleReport.report_type, singleReport.report_for, singleReport.comment,
            singleReport.label.split(".")[1], singleReport.thumbnail))
        });
        this.reportItemsComplete = [...this.reportItems]
      })
  }

  onFilterReportByDate(event) {
    if (event.target.value == "") {
      this.reportItems = [...this.reportItemsComplete]
      return
    }
    let date = moment(event.target.value).format("DD-MMM-YYYY")
    this.reportItems = this.reportItemsComplete.filter(item => {
      return item.reportDate == date
    })
  }

  onFilterReportByTag(event) {
    let currDate = (<HTMLInputElement>document.getElementById("reportDateFilter"))
    currDate.value = "";
    let tagValue = event.target.value
    if (tagValue == "ALL" || tagValue == "") {
      this.reportItems = [...this.reportItemsComplete]
    }
    else {
      this.reportItems = this.reportItemsComplete.filter(item => {
        let itemTags = item.tags.map((tag) => tag.toUpperCase())
        return itemTags.indexOf(tagValue) != -1
      })
    }
  }

  onChangeSingleReportValue(event, i) {
    let val = event.target.value
    let targetName = event.target.name
    let index = i
    this.reportItems[index][targetName] = val
  }

  onUpdateReport(index,htmlElement) {
    this.renderer.removeClass(htmlElement,'show')
    const reportId = this.reportItems[index]._id
    const reportUpdateObject = {
      "lab_info": this.reportItems[index].labName + " " + this.reportItems[index].labAddress,
      "comment": this.reportItems[index].comment,
      "tags": this.reportItems[index].tags,
    }

    this.reportService.updateReport(this.patientID, reportId, reportUpdateObject).subscribe((data) => {
      console.log("update successful", data)
    })
  }


  onAddReport() {
    let dialogRef = this.dialog.open(ReportSkindairyCreateComponent, {
      height: '600px',
      width: '800px',
      data: {
        type: 'report',
        patientId: this.patientID,
        patientName: this.patientName
      }
    });
  }

  removeTag(index, tagPos) {
    this.reportItems[index].tags.splice(tagPos, 1)

  }

  onAddTag(event, i) {

    if (event.which === 13 && event.target.value.length > 0) {
      let tagValue = event.target.value;
      this.reportItems[i].tags.push(tagValue)
      event.target.value = "";
    }
    else if (event.which === 188 && event.target.value.length > 1) {
      let tagValue = event.target.value.slice(0, -1);
      this.reportItems[i].tags.push(tagValue)
      event.target.value = "";
    }
  }


  onDownloadFile(url, label) {
    this.reportService.downloadReportOrSkinDairy(url).subscribe((data) => {
      let fileType = data.split(";")[0].substr(5)
      this.dataURItoBlob(data, fileType).then((blob) => {
        saveAs(blob, label)
      })
    })
  }

  dataURItoBlob(dataURI, fileType) {
    return new Promise((resolve, reject) => {
      const byteString = atob(dataURI.split(";")[1].substr(7));
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: fileType });
      resolve(blob)
    })
  }

  onDeleteFile(reportId) {
    this.reportService.deleteReport(this.patientID, reportId).subscribe((data) => {
      this.reportItems.splice(this.reportItems.findIndex(function (i) {
        return i._id === reportId;
      }), 1);
    },
      (err) => {
        console.log(err)
      })
  }


  //skin dairy
  getSkinDairy() {
    // this.skinDairyItems = []
    this.reportService.getReadSkinDairy(this.patientID)
      .pipe(
        map((data) => {
          return data.sort((a, b) => {
            return new Date(b.create_datetime).getTime() - new Date(a.create_datetime).getTime()
          })
        }))
      .subscribe((data) => {
        this.skinDairyItems = []
        const groups = data.reduce((groups, item) => {
          const date = moment(item.create_datetime).format("YYYY-MM-DD")
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(item);
          return groups;
        }, {});
        const groupArrays = Object.keys(groups).map((date) => {
          let newdate = moment(date).format("DD-MMM-YYYY")
          return {
            newdate,
            skindairyItems: groups[date]
          };
        });
        this.skinDairyItems = [...groupArrays]
        this.skindairyItemsComplete = [...groupArrays]
      })
    this.getSkindairyOnInterval()

  }

  getSkindairyOnInterval() {

    this.skindairySubscription = interval(15 * 60 * 1000)
      .pipe(flatMap(() => this.reportService.getReadSkinDairy(this.patientID)),
        map((data) => {
          return data.sort((a, b) => {
            return new Date(b.create_datetime).getTime() - new Date(a.create_datetime).getTime()
          })
        })
      )
      .subscribe((data) => {
        this.skinDairyItems = []
        const groups = data.reduce((groups, item) => {
          const date = moment(item.create_datetime).format("YYYY-MM-DD")
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(item);
          return groups;
        }, {});
        const groupArrays = Object.keys(groups).map((date) => {
          let newdate = moment(date).format("DD-MMM-YYYY")
          return {
            newdate,
            skindairyItems: groups[date]
          };
        });
        this.skinDairyItems = [...groupArrays]
        this.skindairyItemsComplete = [...groupArrays]
      })

  }
  onAddSkinDairyImage() {
    let dialogRef = this.dialog.open(ReportSkindairyCreateComponent, {
      height: '600px',
      width: '800px',
      data: {
        type: 'skindairy',
        patientId: this.patientID,
        patientName: this.patientName
      }
    });
  }

  onFilterSkindairyByDate(event) {
    if (event.target.value == "") {
      this.skinDairyItems = [...this.skindairyItemsComplete]
      return
    }
    let date = moment(event.target.value).format("DD-MMM-YYYY")
    this.skinDairyItems = this.skindairyItemsComplete.filter((data) => {
      return data.newdate == date
    })
  }

  onDeleteImage(singleItem, item, index) {

    this.reportService.deleteSkinDairy(this.patientID, singleItem._id).subscribe((data) => {
      item["skindairyItems"].splice(index, 1)
      console.log("Image deleted")
    },
      (err) => {
        console.log(err)
      })
  }

  //For view report/skindairy

  openImage(singleItem, type) {
    if(this.onOpenViewModal === true) {
      return
    }
    this.onOpenViewModal = true;
    if (type == 'report' ) {
      if (singleItem.reportExt === "jpeg" || singleItem.reportExt === "jpg" || singleItem.reportExt === "png") {
        this.reportService.downloadReportOrSkinDairy(singleItem.url).subscribe((data) => {
          this.onOpenViewModal = false;
          let dialogRef = this.dialog.open(ReportSkindairyViewComponent, {
            height: '600px',
            width: '800px',
            data: {
              type: 'report',
              item: singleItem,
              imageData: data
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              console.log(result)
            }

          });
        })
      }
      else {
        this.reportService.downloadReportOrSkinDairy(singleItem.url).subscribe((res) => {
          this.onOpenViewModal = false;
          let fileType = res.split(";")[0].substr(5)
          this.dataURItoBlob(res,fileType).then((result) =>{
            const fileURL = URL.createObjectURL(result);
            window.open(fileURL, '_blank');
          })

        })
      }
    }
    else if (type == 'skindairy') {
      this.reportService.downloadReportOrSkinDairy(singleItem.url).subscribe((data) => {
        this.onOpenViewModal = false;
        let dialogRef = this.dialog.open(ReportSkindairyViewComponent, {
          height: '600px',
          width: '800px',
          data: {
            type: 'skindairy',
            item: singleItem,
            imageData: data
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log(result)
          }
        });
      })
    }
  }

  getSkindairyPos(searchItem) {
    let x = this.skindairyItemsComplete
    let pos = -1
    x.forEach((item, index) => {
      if (item.newdate == searchItem) {
        pos = index
      }
    })
    return pos;
  }

  ngOnDestroy() {
    this.reportSubscription.unsubscribe();
    this.skindairySubscription.unsubscribe();
  }

}
