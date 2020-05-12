import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DeviceService } from '@data/services/device.service';
import { Bluetooth } from '@data/scheme/bluetooth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-device-connect',
  templateUrl: './device-connect.component.html',
  styleUrls: ['./device-connect.component.scss'],
})
export class DeviceConnectComponent implements OnInit {
  deviceObs: Observable<Bluetooth>

  constructor(
    private deviceService: DeviceService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.deviceObs = this.deviceService.getDeviceConnect();
  }

  async disconnect() {
    const alert = await this.alertController.create({
      header: 'Disconnect Device',
      message: 'Are you sure to disconnect this device?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: () => this.deviceService.disconnect()
        }
      ]
    });
    alert.present();
  }
}