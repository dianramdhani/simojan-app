import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { DataSurvey } from '@data/scheme/data-survey';
import { SurveyService } from '@data/services/survey.service';
import { NotificationService } from '@shared/services/notification.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CreateEventComponent } from 'app/modules/dashboard/pages/create-event/create-event.component';
import { EventService } from '@data/services/event.service';

@Component({
  selector: 'app-survey-running',
  templateUrl: './survey-running.component.html',
  styleUrls: ['./survey-running.component.scss'],
})
export class SurveyRunningComponent implements OnInit {
  dataSurveyObs: Observable<DataSurvey>;
  eventStatusObs: Observable<boolean>;

  constructor(
    private surveyService: SurveyService,
    private changeRef: ChangeDetectorRef,
    private notificationService: NotificationService,
    private alertController: AlertController,
    private modalController: ModalController,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.dataSurveyObs = this.surveyService.getData();
    this.dataSurveyObs.subscribe(() => setTimeout(() => this.changeRef.detectChanges(), 10));
    this.eventStatusObs = this.eventService.isRunning();
    this.eventStatusObs.subscribe(() => setTimeout(() => this.changeRef.detectChanges(), 10));
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

  async createEvent() {
    const modal = await this.modalController.create({
      component: CreateEventComponent
    });
    return await modal.present();
  }

  async stopEvent() {
    const alert = await this.alertController.create({
      header: 'Stop Event',
      message: 'Are you sure to stop this event?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: () => {
            const timer = setTimeout(() => this.notificationService.toast('Stop event failed. Please try again!'), 5000)
            this.eventService.stop().toPromise()
              .then(stopEventSucces => {
                if (stopEventSucces) {
                  this.notificationService.toast('Stop event in process. Please wait!');
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