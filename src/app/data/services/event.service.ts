import { Injectable } from '@angular/core';
import { DeviceService } from './device.service';
import { GeneratorService } from '@shared/services/generator.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private deviceService: DeviceService,
    private generatorService: GeneratorService
  ) { }

  isRunning() {

  }

  start(name: string) {
    const payload = {
      command: 'EVENT_START',
      data: { name }
    };
    return this.deviceService.send(this.generatorService.message(payload));
  }

  stop() {

  }
}
