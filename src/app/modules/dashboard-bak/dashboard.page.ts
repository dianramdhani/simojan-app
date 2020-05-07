import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DeviceService } from '@data/services/device.service';
import { Bluetooth } from '@data/scheme/bluetooth';
import { DataSurvey } from '@data/scheme/data-survey';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  listBluetoothObs: Observable<Bluetooth[]>;
  formSetupDevice: FormGroup;
  dataSurveyObs: Observable<DataSurvey>;

  constructor(
    public deviceService: DeviceService,
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.formSetupDevice = new FormGroup({
      bluetooth: new FormControl('', Validators.required)
    });

    this.listBluetoothObs = this.deviceService.listBluetooth();

    this.dataSurveyObs = this.deviceService.dataSurvey.asObservable();
    // mencegah rising condition
    this.dataSurveyObs.subscribe(() => setTimeout(() => this.changeRef.detectChanges(), 10));
  }

  connect() {
    const { bluetooth } = this.formSetupDevice.value
    this.deviceService.connect(bluetooth)
      .subscribe(res => {
        if (res) {
          console.log(res);
          // close modal setup
        }
      });
  }

  disconnect() {
    this.deviceService.disconnect();
  }

  async start() {
    await this.deviceService.send('START_SURVEY\n');
  }

  async stop() {
    await this.deviceService.send('STOP_SURVEY\n');
  }
}