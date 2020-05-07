import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { DataSurvey } from '@data/scheme/data-survey';
import { SurveyService } from '@data/services/survey.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-survey-running',
  templateUrl: './survey-running.component.html',
  styleUrls: ['./survey-running.component.scss'],
})
export class SurveyRunningComponent implements OnInit {
  dataSurveyObs: Observable<DataSurvey>

  constructor(
    private surveyService: SurveyService,
    private changeRef: ChangeDetectorRef,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.dataSurveyObs = this.surveyService.getData();
    this.dataSurveyObs.subscribe(() => setTimeout(() => this.changeRef.detectChanges(), 10));
  }

  stop() {
    const timer = setTimeout(() => this.notificationService.toast('Stop survey failed. Please try again!'), 5000)
    this.surveyService.stop().toPromise()
      .then(stopSucces => {
        if (stopSucces) {
          clearTimeout(timer);
        }
      });
  }
}