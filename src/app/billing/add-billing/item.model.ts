export class Item {
 public _id: string;
 public itemHSNCode: string;
 public itemCategory: string;
 public itemName: string;
 public itemRate: number;
 public itemGSTAmount:number;
 public itemCESS:number;


  constructor(itemId:string,itemHSNCode: string,itemCategory: string,itemName: string, itemRate: number, GSTAmount: number,cess:number) {
    this._id = itemId;
    this.itemHSNCode = itemHSNCode;
    this.itemCategory = itemCategory;
    this.itemName = itemName;
    this.itemRate = itemRate;
    this.itemGSTAmount = GSTAmount;
    this.itemCESS = cess
  }
}
