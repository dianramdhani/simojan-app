import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

import { DeviceControllerService } from '@data/services/device-controller.service';
import { map } from 'rxjs/operators';
import { Survey } from '@data/scheme/survey';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.page.html',
  styleUrls: ['./surveys.page.scss'],
})
export class SurveysPage implements OnInit {
  // next binding it with user
  readonly deviceId = 'b2466fc7-61bd-4cb6-8344-bd5e8a82840e';
  surveysObs: Observable<{ name: string, date: string }[]>;
  search: string;

  constructor(
    private deviceControllerService: DeviceControllerService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.surveysObs = this.deviceControllerService.retrieveAllSurveys(this.deviceId)
      .pipe(
        map((surveys: Survey[]): { name: string, date: string }[] => surveys.map(survey => {
          const date = this.datePipe.transform(new Date(survey.startDate), 'medium');
          return { name: survey.surveyName, date };
        }))
      );
  }
}