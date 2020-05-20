import { Component, OnInit, NgZone } from '@angular/core';
import { SurveyService } from '@data/services/survey.service';
import { DeviceService } from '@data/services/device.service';

@Component({
  selector: 'app-widget-survey',
  templateUrl: './widget-survey.component.html',
  styleUrls: ['./widget-survey.component.scss'],
})
export class WidgetSurveyComponent implements OnInit {
  runningStatus: boolean;
  connectStatus: boolean;

  constructor(
    private deviceService: DeviceService,
    private surveyService: SurveyService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.checkConnect();
    this.checkRunning();
  }

  private checkConnect() {
    this.deviceService.isConnect()
      .subscribe(connectStatus => {
        this.ngZone.run(() => this.connectStatus = connectStatus)
      })
  }

  private checkRunning() {
    let timer: any;
    this.surveyService.isRunning()
      .subscribe(runningStatus => {
        this.ngZone.run(() => {
          clearTimeout(timer);
          this.runningStatus = runningStatus;
          timer = setTimeout(() => this.runningStatus = false, 32000);
        });
      });
  }
}