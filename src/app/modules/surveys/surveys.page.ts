import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DeviceControllerService } from '@data/services/device-controller.service';
import { Survey } from '@data/scheme/survey';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.page.html',
  styleUrls: ['./surveys.page.scss'],
})
export class SurveysPage implements OnInit {
  // next binding it with user
  readonly deviceId = 'b2466fc7-61bd-4cb6-8344-bd5e8a82840e';
  surveysObs: Observable<Survey[]>;

  constructor(
    private deviceControllerService: DeviceControllerService
  ) { }

  ngOnInit() {
    this.surveysObs = this.deviceControllerService.retrieveAllSurveys(this.deviceId);
  }
}