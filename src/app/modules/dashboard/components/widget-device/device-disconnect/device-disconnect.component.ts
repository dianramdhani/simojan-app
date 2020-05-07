import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DeviceService } from '@data/services/device.service';
import { Bluetooth } from '@data/scheme/bluetooth';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-device-disconnect',
  templateUrl: './device-disconnect.component.html',
  styleUrls: ['./device-disconnect.component.scss'],
})
export class DeviceDisconnectComponent implements OnInit {
  formSetupDevice: FormGroup;
  listBluetoothObs: Observable<Bluetooth[]>;

  constructor(
    private deviceService: DeviceService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.listBluetoothObs = this.deviceService.listBluetooth();

    this.formSetupDevice = new FormGroup({
      bluetooth: new FormControl('', Validators.required)
    });
  }

  connect() {
    const { bluetooth } = this.formSetupDevice.value,
      timer = setTimeout(() => this.notificationService.toast('Connect device failed. Please try again!'), 5000)
    this.deviceService.connect(bluetooth).toPromise()
      .then(connectStatus => {
        if (connectStatus) {
          clearTimeout(timer);
        }
      });
  }
}