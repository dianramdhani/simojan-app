import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { DeviceService } from './device.service';
import { DataSurvey } from '@data/scheme/data-survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(
    private deviceService: DeviceService
  ) { }

  isRunning(): Observable<boolean> {
    const deviceHasDataSurvey = this.deviceService.dataSurvey.asObservable()
      .pipe(
        map(data => {
          console.log(data);
          return data !== null ? true : false;
        })
      );

    return this.deviceService.isConnect()
      .pipe(
        switchMap(statusConnection => {
          if (statusConnection) {
            return deviceHasDataSurvey
          } else {
            return of(false);
          }
        })
      )
  }

  getData(): Observable<DataSurvey> {
    return this.deviceService.dataSurvey.asObservable();
  }
}
