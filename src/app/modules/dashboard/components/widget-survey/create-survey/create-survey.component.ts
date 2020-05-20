import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { SurveyService } from '@data/services/survey.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss'],
})
export class CreateSurveyComponent implements OnInit {
  formCreateSurvey: FormGroup;

  constructor(
    private surveyService: SurveyService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.formCreateSurvey = new FormGroup({
      name: new FormControl(null, Validators.required),
      surveyorName: new FormControl(null, Validators.required),
      startCity: new FormControl(null, Validators.required),
      startStreetName: new FormControl(null, Validators.required)
    });
  }

  start() {
    const { name, surveyorName, startCity, startStreetName } = this.formCreateSurvey.value,
      timer = setTimeout(() => this.notificationService.toast('Start survey failed. Please try again!'), 5000)
    this.surveyService.start(name, surveyorName, startCity, startStreetName).toPromise()
      .then(startSuccess => {
        if (startSuccess) {
          clearTimeout(timer);
        }
      });
  }
}