import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { DataSurvey } from '@data/scheme/data-survey';
import { SurveyService } from '@data/services/survey.service';

@Component({
  selector: 'app-survey-running',
  templateUrl: './survey-running.component.html',
  styleUrls: ['./survey-running.component.scss'],
})
export class SurveyRunningComponent implements OnInit {
  dataSurveyObs: Observable<DataSurvey>

  constructor(
    private surveyService: SurveyService,
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.dataSurveyObs = this.surveyService.getData();
    this.dataSurveyObs.subscribe(() => setTimeout(() => this.changeRef.detectChanges(), 10));
  }
}