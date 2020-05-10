import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DeviceService } from './device.service';
import { GeneratorService } from '@shared/services/generator.service';
import { DataSurvey } from '@data/scheme/data-survey';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private deviceService: DeviceService,
    private generatorService: GeneratorService
  ) { }

  isRunning(): Observable<boolean> {
    const checkEventStatus = (dataSurvey: DataSurvey): boolean => dataSurvey.eventStatus;
    return this.deviceService.dataSurvey.asObservable()
      .pipe(
        map(checkEventStatus)
      );
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
