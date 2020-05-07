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

  stop() {
    return this.deviceService.send('STOP\n');
  }
}