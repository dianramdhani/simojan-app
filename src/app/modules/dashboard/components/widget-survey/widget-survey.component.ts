import { Component, OnInit, NgZone } from '@angular/core';
import { SurveyService } from '@data/services/survey.service';

@Component({
  selector: 'app-widget-survey',
  templateUrl: './widget-survey.component.html',
  styleUrls: ['./widget-survey.component.scss'],
})
export class WidgetSurveyComponent implements OnInit {
  runningStatus: boolean;

  constructor(
    private surveyService: SurveyService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    let timer: NodeJS.Timer;
    this.surveyService.isRunning()
      .subscribe(runningStatus => {
        this.ngZone.run(() => {
          clearTimeout(timer);
          this.runningStatus = runningStatus;
          timer = setTimeout(() => this.runningStatus = false, 5000);
        });
      });
  }
}