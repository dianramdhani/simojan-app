import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Survey } from '@data/scheme/survey';

@Injectable({
  providedIn: 'root'
})
export class DeviceControllerService {
  readonly url = 'http://apps.tritronik.com/roughness-detection-system-service';

  constructor(
    private httpClient: HttpClient
  ) { }

  retrieveAllSurveys(id: string) {
    return this.httpClient.get<Survey[]>(`${this.url}/device-service/devices/${id}/surveys`);
  }
}