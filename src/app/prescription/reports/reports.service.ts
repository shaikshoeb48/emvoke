import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, of } from 'rxjs';
import { retry, tap } from 'rxjs/operators';

@Injectable()
export class ReportsService implements OnDestroy {

  constructor(private http: HttpClient) {

    this.cacheSub = setInterval(() => {
      this._lruCache.clear();
    }, 15 * 60 * 1000)
  }
  reportsServerUrl = `${environment.reportsUrl}`;
  reportData = new Subject<any>();
  skindairyData = new Subject<any>();
  cacheSub: any;
  private _lruCache = new Map();
  lruCacheMaxEntries = 10;
  //s3 upload and dowanload.
  //url here stands for s3 presigned url
  uploadReportOrSkinDairy(url, data) {
    return this.http.put(url, data).pipe(retry(3));
  }

  downloadReportOrSkinDairy(url) {
    if (this._lruCache.has(url)) {
      console.log("cached")
      const image = this.getCachedImage(url);
      return of(image);
    }
    else{
      return this.http.get(url, { responseType: "text" })
      .pipe(tap(res => this.checkAndCacheImage(url, res)))
    }
  }

  //caching for images

  getCachedImage(url:string){
    let entry = this._lruCache.get(url)
    this._lruCache.delete(url)
    this._lruCache.set(url,entry)
    return entry
  }

  checkAndCacheImage(url: string, base64: string) {
    if(this._lruCache.size >= this.lruCacheMaxEntries){
      const keyToDelete = this._lruCache.keys().next().value;
      this._lruCache.delete(keyToDelete)
    }
    this._lruCache.set(url, base64);
  }

  //API calls for Report
  getReadReports(patientId: string) {
    return this.http.get<any>(`${this.reportsServerUrl}report/read/pid`, { headers: this.getReadReportsHeader(patientId) });
  }

  getReadReportsHeader(patientId: string) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      'X-Profile-ID': patientId
    });
  }

  getSingleReport(patientId: string, reportId: string) {
    return this.http.get<any>(`${this.reportsServerUrl}report/read/rid`, { headers: this.getSingleReportHeaders(patientId, reportId) })
  }

  getSingleReportHeaders(patientId: string, reportId: string) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      'X-Profile-ID': patientId,
      'X-Report-Id': reportId
    });
  }

  createReport(data) {
    return this.http.post<any>(`${this.reportsServerUrl}report/create`, data, { headers: this.getCreateReportHeader() });
  }

  getCreateReportHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Doctor-ID': localStorage.getItem('doctorId')
    });
  }

  uploadReportSuccessful(patientId, reportId) {
    return this.http.patch<any>(`${this.reportsServerUrl}report/upload/completed`, null, { headers: this.getReportUploadSuccessfulHeader(patientId, reportId) })
  }

  getReportUploadSuccessfulHeader(patientId, reportId) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      'X-Profile-ID': patientId,
      'X-Report-Id': reportId
    });
  }

  uploadReportFailed(patientId, reportId) {
    return this.http.patch<any>(`${this.reportsServerUrl}report/upload/failed`, null, { headers: this.getReportUploadFailedHeader(patientId, reportId) })
  }

  getReportUploadFailedHeader(patientId: string, reportId: string) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      'X-Profile-ID': patientId,
      'X-Report-Id': reportId
    });
  }

  deleteReport(patientId, reportId) {
    return this.http.delete<any>(`${this.reportsServerUrl}report/delete`, { headers: this.getdeleteReportHeader(patientId, reportId) })

  }

  getdeleteReportHeader(patientId: string, reportId: string) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      'X-Profile-ID': patientId,
      'X-Report-Id': reportId
    });
  }

  updateReport(patientId, reportId, data) {
    return this.http.patch<any>(`${this.reportsServerUrl}report/update`, data, { headers: this.getUpdateReportHeader(patientId, reportId) })

  }

  getUpdateReportHeader(patientId, reportId) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      'X-Profile-ID': patientId,
      'X-Report-Id': reportId

    });
  }

  //SKINDAIRY

  getReadSkinDairy(patientId: string) {
    return this.http.get<any>(`${this.reportsServerUrl}diary/read/pid`, { headers: this.getReadSkinDairyHeader(patientId) });
  }

  getReadSkinDairyHeader(patientId: string) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      'X-Profile-ID': patientId
    });
  }

  getSingleSkinDairy(patientId: string, skinDairyId: string) {
    return this.http.get<any>(`${this.reportsServerUrl}diary/read/sid`, { headers: this.getSingleSkinDairyHeader(patientId, skinDairyId) });

  }

  getSingleSkinDairyHeader(patientId, skinDairyId) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      'X-Profile-ID': patientId,
      'X-SkinDiary-ID': skinDairyId
    });
  }

  createSkinDairy(data) {
    return this.http.post<any>(`${this.reportsServerUrl}diary/create`, data, { headers: this.getCreateSkinDairyHeader() });
  }

  getCreateSkinDairyHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Doctor-ID': localStorage.getItem('doctorId')
    });
  }

  uploadSkinDairySuccessful(patientId: string, skinDairyId: string) {
    return this.http.patch<any>(`${this.reportsServerUrl}diary/upload/completed`, null, { headers: this.getSkinDairyUploadSuccessfulHeader(patientId, skinDairyId) })

  }

  getSkinDairyUploadSuccessfulHeader(patientId: string, skinDairyId: string) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      'X-Profile-ID': patientId,
      'X-SkinDiary-ID': skinDairyId
    });
  }

  uploadSkinDairyFailed(patientId: string, skinDairyId: string) {
    return this.http.patch<any>(`${this.reportsServerUrl}diary/upload/failed`, null, { headers: this.getSkinDairyUploadFailedHeader(patientId, skinDairyId) })
  }

  getSkinDairyUploadFailedHeader(patientId: string, skinDairyId: string) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      'X-Profile-ID': patientId,
      'X-SkinDiary-ID': skinDairyId
    });
  }

  updateSkinDairy(patientId: string, skinDairyId: string) {
    return this.http.get<any>(`${this.reportsServerUrl}diary/update`, { headers: this.getUpdateSkinDairyHeader(patientId, skinDairyId) });
  }

  getUpdateSkinDairyHeader(patientId: string, skinDairyId: string) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      'X-Profile-ID': patientId,
      'X-SkinDiary-Id': skinDairyId

    });
  }

  deleteSkinDairy(patientId: string, skinDairyId: string) {
    return this.http.delete<any>(`${this.reportsServerUrl}diary/delete`, { headers: this.getDeleteSkinDairyHeader(patientId, skinDairyId) })

  }

  getDeleteSkinDairyHeader(patientId: string, skinDairyId: string) {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Doctor-ID': localStorage.getItem('doctorId'),
      'X-Profile-ID': patientId,
      'X-SkinDiary-ID': skinDairyId
    });
  }

  ngOnDestroy() {
    if (this.cacheSub) {
      clearInterval(this.cacheSub)
    }
  }


}
