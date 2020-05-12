import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Survey } from '@data/scheme/survey';
import { NotificationService } from '@shared/services/notification.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceControllerService {
  readonly url = 'http://apps.tritronik.com/roughness-detection-system-service';

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) { }

  retrieveAllSurveys(id: string) {
    return this.httpClient.get<Survey[]>(`${this.url}/device-service/devices/${id}/surveys`)
      .pipe(
        catchError(err => {
          console.error('REQUEST ERROR', err);
          this.notificationService.toast('Request error. Please try again later!');
          return of([]);
        })
      );
  }
}