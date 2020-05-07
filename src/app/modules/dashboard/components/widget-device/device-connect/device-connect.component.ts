import { Component, OnInit } from '@angular/core';
import { DeviceService } from '@data/services/device.service';

@Component({
  selector: 'app-device-connect',
  templateUrl: './device-connect.component.html',
  styleUrls: ['./device-connect.component.scss'],
})
export class DeviceConnectComponent implements OnInit {
  constructor(
    private deviceService: DeviceService
  ) { }

  ngOnInit() { }

  disconnect() {
    this.deviceService.disconnect();
  }
}