export interface QueueMgmt {
  title: string;
  id: string;
  patients: Patient[];
}

export interface Patient {
  title: string;
  description: string;
  id: string;
}
