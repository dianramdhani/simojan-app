import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DeviceService } from '@data/services/device.service';
import { Bluetooth } from '@data/scheme/bluetooth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  listBluetoothObs: Observable<Bluetooth[]>;
  formSetupDevice: FormGroup;

  constructor(
    public deviceService: DeviceService,
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.formSetupDevice = new FormGroup({
      bluetooth: new FormControl('', Validators.required)
    });

    this.listBluetoothObs = this.deviceService.listBluetooth();
  }

  connect() {
    const { bluetooth } = this.formSetupDevice.value
    this.deviceService.connect(bluetooth)
      .subscribe(res => {
        if (res) {
          console.log(res);

          this.deviceService.dataSurvey
            .subscribe(res => {
              console.log('ini loh data survey', res);
              this.changeRef.detectChanges();
            });
        }
      });
  }

  disconnect() {
    this.deviceService.disconnect();
  }
}