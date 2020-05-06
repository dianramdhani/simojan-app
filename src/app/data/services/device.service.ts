import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { from, Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Bluetooth } from '@data/scheme/bluetooth';
import { NotificationService } from '@shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  lastDevice = new BehaviorSubject<Bluetooth>(null);

  constructor(
    private bluetoothSerial: BluetoothSerial,
    private notificationService: NotificationService
  ) { }

  init() {
    this.bluetoothSerial.subscribe('\n')
      .subscribe(data => {
        console.log(data);
      });
  }

  listBluetooth(): Observable<Bluetooth[]> {
    return from(this.bluetoothSerial.list());
  }

  connect(bluetooth: Bluetooth) {
    return this.bluetoothSerial.connect(bluetooth.id)
      .pipe(
        tap(() => {
          this.notificationService.toast(`Connection success to ${bluetooth.name} - ${bluetooth.address}`)
          this.lastDevice.next(bluetooth);
        }),
        catchError(err => {
          this.lastDevice.next(null);
          console.log('CONNECT ERROR', err);
          this.notificationService.toast('Connection failed. Please try again!');
          return of(false);
        })
      );
  }

  disconnect() {
    return this.bluetoothSerial.disconnect()
      .then(() => this.notificationService.toast('Device disconnected.'));
  }
}