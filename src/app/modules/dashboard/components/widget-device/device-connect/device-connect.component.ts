import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DeviceService } from '@data/services/device.service';
import { Bluetooth } from '@data/scheme/bluetooth';

@Component({
  selector: 'app-device-connect',
  templateUrl: './device-connect.component.html',
  styleUrls: ['./device-connect.component.scss'],
})
export class DeviceConnectComponent implements OnInit {
  deviceObs: Observable<Bluetooth>

  constructor(
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.deviceObs = this.deviceService.getDeviceConnect();
  }

  disconnect() {
    this.deviceService.disconnect();
  }
}