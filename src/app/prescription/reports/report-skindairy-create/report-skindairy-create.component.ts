import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PrescriptionService } from '../../prescription.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Report } from '../report.model';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-report-skindairy-create',
  templateUrl: './report-skindairy-create.component.html',
  styleUrls: ['./report-skindairy-create.component.scss']
})
export class ReportSkindairyCreateComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private imageCompress: NgxImageCompressService, private reportService: ReportsService) { }

  file: File;
  fileType;
  fileExt
  reportCreateForm: FormGroup;
  skindairyCreateForm: FormGroup;
  submittedReportForm = false;
  patientId;
  patientName;
  currentDate;
  reportId;
  signedUrl;
  singleReport: Report;
  uploadStart = false;
  uploadFinish = false;
  thumbnail;
  compressedImage;
  unsupportedFileType = false;
  tags = []
  reportSizeCheck = false;
  supportedFileTypeList = ["image/png", "image/jpeg", "application/pdf"]

  ngOnInit() {
    this.patientId = this.data["patientId"]
    this.patientName = this.data["patientName"]
    if (this.data["type"] == "report") {
      this.reportCreateForm = new FormGroup({
        'fileLabel': new FormControl('', Validators.required),
        'tagName': new FormControl(''),
        'labName': new FormControl('', Validators.required),
        'labAddress': new FormControl('', Validators.required),
        'comments': new FormControl(''),
        'reportType': new FormControl('')
      })
    }
    else if (this.data["type"] == "skindairy") {
      this.skindairyCreateForm = new FormGroup({
        'imageLabel': new FormControl('', Validators.required),
        'clickType': new FormControl(''),
        'comments': new FormControl(''),

      })
    }
  }

  fileBrowseHandler(file) {
    if (file.length == 0) {
      return
    }
    this.reportSizeCheck = false;
    if (file[0].size > 10000000) {
      this.reportSizeCheck = true;
      return
    }
    this.fileType = file[0].type;
    this.fileExt = this.fileType.split("/")[1]
    if (this.supportedFileTypeList.indexOf(this.fileType) == -1) {
      this.unsupportedFileType = true;
      return
    }
    this.file = file[0]
    this.unsupportedFileType = false;
    this.currentDate = moment().format('DD-MM-YYYY')
  }

  onFileUpload() {
    this.submittedReportForm = true;
    if (this.reportCreateForm.invalid) {
      return;
    }
    this.submittedReportForm = false;
    this.uploadStart = true;
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      if (this.file.type == "image/jpeg" || this.file.type == "image/png") {
        this.generateThumbnail(event.target.result).then((thumbnailImage) => {
          this.thumbnail = thumbnailImage;
          this.compressImage(event.target.result).then((compressedImage) => {
            this.compressedImage = compressedImage
            this.createReportObjectAndUpload(this.compressedImage)
          })
        })
          .catch((err) => {
            console.log(err)
          })
      }
      else if (this.file.type == "application/pdf") {
        this.thumbnail = "";
        this.createReportObjectAndUpload(event.target.result)
      }
    })
    reader.readAsDataURL(this.file);

  }


  onFileRemove() {
    this.file = undefined
  }

  get reportform() { return this.reportCreateForm.controls }
  get skindairyform() { return this.skindairyCreateForm.controls }


  createReportObjectAndUpload(compressedFile) {
    const reportFormValue = this.reportCreateForm.value
    let currentDate = moment().format('YYYY-MM-DD')
    let labInfo = reportFormValue.labName + "#_#" + reportFormValue.labAddress
    const reportCreateObject = {
      "profile_id": this.patientId,
      "report_date": currentDate,
      "report_type": reportFormValue.reportType,
      "report_for": this.patientName,
      "label": reportFormValue.fileLabel + "." + this.fileExt,
      "report_ext": this.fileExt,
      "bucket": "lookplushmobileusercontent",
      "is_private": false,
      "thumbnail": this.thumbnail,
      "lab_info": labInfo,
      "comment": reportFormValue.comments,
      "tags": this.tags,
      "report_data": "",
      "clinic_doctor_link": [{
        "clinic_id": localStorage.getItem('clinicId'),
        "doctor_id": localStorage.getItem('doctorId')
      }]
    }
    this.reportService.createReport(reportCreateObject).subscribe((result) => {
      this.reportId = result.id;
      this.signedUrl = result.upload_url
      this.reportService.uploadReportOrSkinDairy(this.signedUrl, compressedFile).subscribe((res) => {
        this.reportService.uploadReportSuccessful(this.patientId, this.reportId).subscribe((data) => {
          this.singleReport = new Report(this.reportId, this.patientId, reportFormValue.fileLabel,
            currentDate, reportFormValue.labName, reportFormValue.labAddress, this.tags,
            this.signedUrl, reportFormValue.reportType, this.patientName, reportFormValue.comments,
            reportCreateObject.report_ext, reportCreateObject.thumbnail)
          this.reportService.reportData.next(this.singleReport)
          console.log("Upload successful")
          this.uploadStart = false;
          this.uploadFinish = true;
        })
      },
        (err) => {
          this.reportService.uploadReportFailed(this.patientId, this.reportId).subscribe((data) => {
            console.log("Upload failed")
            this.uploadStart = false;
          })
        })
    },
      (err) => {
        console.log(err)
      })
  }

  generateThumbnail(sourceImg) {
    return new Promise((resolve, reject) => {
      let orginalSize = this.imageCompress.byteCount(sourceImg);
      let orientation = -1;
      let ratio;
      let quality;
      //1000000 represents 1 MB size
      if (orginalSize < 1000000) {
        ratio = 30;
        quality = 20
      }
      else if (orginalSize >= 1000000 && orginalSize < 10000000) {
        ratio = 10;
        quality = 5;
      }
      else {
        ratio = 10;
        quality = 5;
      }
      this.imageCompress.compressFile(sourceImg, orientation, ratio, quality).then((result) => {
        // let newSize = this.imageCompress.byteCount(result);
        // console.log("thumbnail size", this.formatBytes(newSize))
        resolve(result)
      }, (err) => {
        return reject("thumbnail failed to create")
      })
    })
  }

  compressImage(sourceImg) {
    return new Promise((resolve, reject) => {
      let orginalSize = this.imageCompress.byteCount(sourceImg);
      // console.log(this.formatBytes(orginalSize))
      let orientation = -1;
      let ratio;
      let quality;
      this.reportSizeCheck = false;

      ratio = 100
      quality = 40

      this.imageCompress.compressFile(sourceImg, orientation, ratio, quality).then((result) => {
        // console.log("compressed image size", this.formatBytes(this.imageCompress.byteCount(result)))
        let compressedSize = this.imageCompress.byteCount(result)
        if (compressedSize < orginalSize) {
          resolve(sourceImg)
        }
        else {
          resolve(result)
        }
      }, (err) => {
        return reject("Image failed to compress")
      })
    })

  }

  onAddTag(event, tag?) {
    if (event.which === 13 && event.target.value.length > 0) {
      let tagValue = event.target.value;
      this.tags.push(tagValue)
      event.target.value = "";
    }
    else if (event.which === 188 && event.target.value.length > 1) {
      let tagValue = event.target.value.slice(0, -1);
      this.tags.push(tagValue)
      event.target.value = "";
    }
    else if (event.target.tagName === "BUTTON" && tag.value.length > 0) {
      let tagValue = tag.value
      tag.value = ""
      this.tags.push(tagValue)
    }
  }

  removeTag(i) {
    this.tags.splice(i, 1);
  }

  //convert file size to required format
  formatBytes(bytes, decimals?) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onSkinDairyImageUpload() {
    this.submittedReportForm = true;
    if (this.skindairyCreateForm.invalid) {
      return;
    }
    this.submittedReportForm = false;
    this.uploadStart = true;
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      if (this.file.type == "image/jpeg" || this.file.type == "image/png") {
        this.generateThumbnail(event.target.result)
          .then((thumbnail) => {
            this.thumbnail = thumbnail;
            this.compressImage(event.target.result)
              .then((compressedImage) => {
                this.compressedImage = compressedImage;
                this.createAndUploadSkinDairyImage(this.compressedImage)
              })

          })
      }
    });
    reader.readAsDataURL(this.file);

  }

  createAndUploadSkinDairyImage(compressedImage) {
    const skindairyFormValue = this.skindairyCreateForm.value
    const skindairyCreateObject = {
      "profile_id": this.patientId,
      "click_type": skindairyFormValue.clickType,
      "image_ext": this.fileExt,
      "image": skindairyFormValue.imageLabel  + "." + this.fileExt,
      "label": skindairyFormValue.imageLabel  + "." + this.fileExt,
      "thumbnail": this.thumbnail,
      "tags": this.tags,
      "comment": skindairyFormValue.comments,
      "is_private": false,
      "clinic_doctor_link": [{
        "clinic_id": localStorage.getItem('clinicId'),
        "doctor_id": localStorage.getItem('doctorId')
      }],
      "skin_diary_founding": [],
      "tagging": []
    }
    this.reportService.createSkinDairy(skindairyCreateObject).subscribe((result) => {
      const skindairyId = result.id;
      this.signedUrl = result.upload_url
      this.reportService.uploadReportOrSkinDairy(this.signedUrl, compressedImage).subscribe((data) => {
        this.reportService.uploadSkinDairySuccessful(this.patientId, skindairyId).subscribe((data) => {
          this.uploadStart = false;
          this.uploadFinish = true;
          console.log("upload successful")
          this.reportService.skindairyData.next({ patientId: this.patientId, skindairyId: skindairyId })
        })
      },
        (err) => {
          this.reportService.uploadSkinDairyFailed(this.patientId, skindairyId).subscribe((data) => {
            console.log("upload failed")
          })
        })
    })
  }
}
