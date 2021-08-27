export class Report{
  public _id: string;
  public profileId: string;
  public label: string;
  public reportDate: string;
  public labName: string;
  public labAddress: string;
  public tags;
  public url: string;
  public reportType: string;
  public reportFor: string;
  public comment: string;
  public reportExt: string;
  public thumbnail: string;
  public reportData: string;

  constructor(id: string, profileId: string, label: string, reportDate: string,
    labName: string, labAddress: string, tags, url:string, reportType: string,
    reportFor: string, comment: string,reportExt: string, thumbnail?: string, reportData?: string){
    this._id = id;
    this.profileId = profileId
    this.label = label;
    this.reportDate = reportDate;
    this.labName = labName;
    this.labAddress = labAddress;
    this.tags = tags;
    this.url = url;
    this.reportType = reportType;
    this.reportFor = reportFor;
    this.comment = comment;
    this.reportExt = reportExt;
    this.thumbnail = thumbnail ? thumbnail : "";
    this.reportData = reportData ? reportData : "";
  }
}
