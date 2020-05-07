import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DeviceService } from '@data/services/device.service';
import { Bluetooth } from '@data/scheme/bluetooth';

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
  ) { }

  ngOnInit() {
    this.listBluetoothObs = this.deviceService.listBluetooth();

    this.formSetupDevice = new FormGroup({
      bluetooth: new FormControl('', Validators.required)
    });
  }

  connect() {
    const { bluetooth } = this.formSetupDevice.value
    this.deviceService.connect(bluetooth).toPromise();
  }
}