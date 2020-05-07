import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';

import { DeviceService } from '@data/services/device.service';

@Component({
  selector: 'app-widget-device',
  templateUrl: './widget-device.component.html',
  styleUrls: ['./widget-device.component.scss'],
})
export class WidgetDeviceComponent implements OnInit {
  connectStatus: boolean;

  constructor(
    private deviceService: DeviceService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.deviceService.connectStatus
      .subscribe(res => {
        this.ngZone.run(() => this.connectStatus = res);
      });
  }
}