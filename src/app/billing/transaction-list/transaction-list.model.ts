export class TransactionList {
  public invoiceNumber: string;
  public patientName: string;
  public doctorName: string;
  public totalAmount: number;
  public status: string;
  public type: string;
  public patientPhoneNo: string;
  public date: string;

  constructor(invoiceNo:string, patName:string,docName:string, totAmt:number, stat:string, type:string,phoneNumber:string, date:string){
    this.invoiceNumber = invoiceNo;
    this.patientName = patName;
    this.doctorName = docName;
    this.totalAmount = totAmt;
    this.status = stat;
    this.type = type;
    this.patientPhoneNo = phoneNumber;
    this.date = date
  }
}
