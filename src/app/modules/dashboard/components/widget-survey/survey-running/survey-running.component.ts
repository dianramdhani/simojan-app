import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { DataSurvey } from '@data/scheme/data-survey';
import { SurveyService } from '@data/services/survey.service';
import { NotificationService } from '@shared/services/notification.service';
import { AlertController } from '@ionic/angular';

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
    private notificationService: NotificationService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.dataSurveyObs = this.surveyService.getData();
    this.dataSurveyObs.subscribe(() => setTimeout(() => this.changeRef.detectChanges(), 10));
  }

  async stop() {
    const alert = await this.alertController.create({
      header: 'Stop Survey',
      message: 'Are you sure to stop this survey?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: () => {
            const timer = setTimeout(() => this.notificationService.toast('Stop survey failed. Please try again!'), 5000)
            this.surveyService.stop().toPromise()
              .then(stopSucces => {
                if (stopSucces) {
                  this.notificationService.toast('Stop survey in process. Please wait!');
                  clearTimeout(timer);
                }
              });
          }
        }
      ]
    });
    alert.present();
  }
}