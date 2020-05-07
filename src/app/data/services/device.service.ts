import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { from, Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Bluetooth } from '@data/scheme/bluetooth';
import { NotificationService } from '@shared/services/notification.service';
import { DataSurvey } from '@data/scheme/data-survey';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  // last device di ambil dari localstorage
  private lastDevice = new BehaviorSubject<Bluetooth>(null);
  private connectStatus = new BehaviorSubject<boolean>(false);
  dataSurvey = new BehaviorSubject<DataSurvey>(null);

  constructor(
    private bluetoothSerial: BluetoothSerial,
    private notificationService: NotificationService
  ) { }

  init() {
    this.bluetoothSerial.isConnected()
      .then(res => {
        this.connectStatus.next(true)
        console.log('DEVICE CONNECTED', res);
        // this.notificationService.toast('Device connected.');
      })
      .catch(err => {
        this.connectStatus.next(false);
        console.log('DEVICE DISCONNECTED', err);
        // this.notificationService.toast('Device disconnected.');
      });

    this.bluetoothSerial.subscribe('\n')
      .subscribe(data => {
        try {
          const parse = JSON.parse(data);
          console.log(parse);
          this.dataSurvey.next(parse);
        } catch (error) {
          console.log('PARSING DATA SURVEY ERROR!', error);
          // this.notificationService.toast('PARSING DATA SURVEY ERROR!');
        }
        console.log(data);
      });
  }

  listBluetooth(): Observable<Bluetooth[]> {
    return from(this.bluetoothSerial.list());
  }

  connect(bluetooth: Bluetooth): Observable<boolean> {
    return this.bluetoothSerial.connect(bluetooth.id)
      .pipe(
        map(() => {
          // this.notificationService.toast(`Connection success to ${bluetooth.name} - ${bluetooth.address}`)
          this.lastDevice.next(bluetooth);
          this.connectStatus.next(true);
          return true;
        }),
        catchError(err => {
          this.lastDevice.next(null);
          console.log('CONNECT ERROR', err);
          this.notificationService.toast('Connection failed. Please try again!');
          return of(false);
        })
      );
  }

  isConnect(): Observable<boolean> {
    return this.connectStatus.asObservable();
  }

  getDeviceConnect(): Observable<Bluetooth> {
    return this.lastDevice.asObservable();
  }

  disconnect() {
    return this.bluetoothSerial.disconnect()
      .then(() => {
        this.connectStatus.next(false);
        // this.notificationService.toast('Device disconnected.');
      });
  }

  send(command: string): Observable<boolean> {
    return from(this.bluetoothSerial.write(command))
      .pipe(
        catchError(err => {
          this.notificationService.toast(`Command failed - ${err}`);
          return of(false);
        }),
        map(res => {
          // this.notificationService.toast(`Command '${command}' success - ${res}`)
          console.log(`Command '${command}' success - ${res}`);
          return true;
        })
      )
  }
}