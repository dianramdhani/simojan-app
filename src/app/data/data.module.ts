import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { HttpClientModule } from '@angular/common/http';

import { DeviceService } from './services/device.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    DeviceService,
    BluetoothSerial
  ],
  exports: [
    HttpClientModule
  ]
})
export class DataModule { }
