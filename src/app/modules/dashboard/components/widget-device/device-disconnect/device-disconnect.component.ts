import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DeviceService } from '@data/services/device.service';
import { Bluetooth } from '@data/scheme/bluetooth';
import { StorageService } from '@shared/services/storage.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-device-disconnect',
  templateUrl: './device-disconnect.component.html',
  styleUrls: ['./device-disconnect.component.scss'],
})
export class DeviceDisconnectComponent implements OnInit {
  formSetupDevice: FormGroup;
  listBluetoothObs: Observable<Bluetooth[]>;
  reconnect = false;

  constructor(
    private deviceService: DeviceService,
    private storageService: StorageService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.listBluetoothObs = this.deviceService.listBluetooth();

    this.formSetupDevice = new FormGroup({
      bluetooth: new FormControl('', Validators.required)
    });

    this.listBluetoothObs
      .subscribe(async listBluetooth => {
        const lastDevice: Bluetooth = await this.storageService.get(this.storageService.DEVICE_KEY);
        if (lastDevice) {
          const foundDevice = listBluetooth.find(bluetooth => bluetooth.address === lastDevice.address);
          if (foundDevice) {
            this.formSetupDevice.patchValue({ bluetooth: foundDevice });
            this.reconnect = true;
            this.notificationService.toast('Try to reconnecting device. Please wait!');
            await this.connect();
            this.reconnect = false;
          }
        }
      })

  }

  connect() {
    const { bluetooth } = this.formSetupDevice.value;
    return this.deviceService.connect(bluetooth).toPromise();
  }
}