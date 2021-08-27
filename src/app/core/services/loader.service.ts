import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {

  loadingStatus = new Subject();

  constructor() { }

  set loading(value) {
    this.loadingStatus.next(value);
  }

  show(): void {
    this.loading = true;
  }

  hide(): void {
    this.loading = false;
  }
}
