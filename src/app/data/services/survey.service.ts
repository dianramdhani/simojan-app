import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of, iif } from 'rxjs';

import { DeviceService } from './device.service';
import { DataSurvey } from '@data/scheme/data-survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(
    private deviceService: DeviceService
  ) { }

  private dataSurveyChecker() {
    return this.deviceService.dataSurvey.asObservable()
      .pipe(
        map(data => data !== null ? true : false)
      );
  }

  isRunning(): Observable<boolean> {
    return this.deviceService.isConnect()
      .pipe(
        switchMap(statusConnection => iif(() => statusConnection, this.dataSurveyChecker(), of(false))),
      )
  }

  getData(): Observable<DataSurvey> {
    return this.deviceService.dataSurvey.asObservable();
  }

  private messageGenerator(payload: {}) {
    return `${JSON.stringify(payload)}\n`
  }

  start(name: string) {
    const payload = {
      command: 'SURVEY_START',
      data: { name }
    };
    return this.deviceService.send(this.messageGenerator(payload));
  }

  stop() {
    const payload = {
      command: 'SURVEY_STOP',
      data: {}
    };
    return this.deviceService.send(this.messageGenerator(payload));
  }
}
