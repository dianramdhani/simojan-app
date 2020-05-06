import { Component, OnInit } from '@angular/core';
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
  loadingConnect = false;

  constructor(
    private deviceService: DeviceService,
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
        }
      });
  }

  disconnect() {
    this.deviceService.disconnect();
  }
}