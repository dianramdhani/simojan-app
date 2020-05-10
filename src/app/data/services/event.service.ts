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

  start(name: string) {
    const payload = {
      command: 'EVENT_START',
      data: { name }
    };
    return this.deviceService.send(JSON.stringify(payload));
  }

  stop() {

  }
}
