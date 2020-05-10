import { Injectable } from '@angular/core';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private deviceService: DeviceService
  ) { }

  isRunning() {

  }

  start() {

  }

  stop() {

  }
}
