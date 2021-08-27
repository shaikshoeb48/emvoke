import { Item } from './item.model';

export interface AddBilling {

  id: string;
  clinicId: string;
  doctorId: string;
  role:string;
  gstNo:string;
  items: Item[];

}
