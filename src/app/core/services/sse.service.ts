import { Injectable } from '@angular/core';
import { EventSourcePolyfill } from 'ng-event-source';

@Injectable({
  providedIn: 'root'
})
export class SseService {

  constructor() { }


  getEventSource(url, header){
  	return new EventSourcePolyfill(url, {headers: header, withCredentials: true});
  }
}
