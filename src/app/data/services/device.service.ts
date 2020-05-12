import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { from, Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Bluetooth } from '@data/scheme/bluetooth';
import { NotificationService } from '@shared/services/notification.service';
import { DataSurvey } from '@data/scheme/data-survey';
import { StorageService } from '@shared/services/storage.service';

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
    private notificationService: NotificationService,
    private storageService: StorageService
  ) { }

  init() {
    this.bluetoothSerial.isConnected()
      .then(async res => {
        const lastDevice = await this.storageService.get(this.storageService.DEVICE_KEY);
        this.lastDevice.next(lastDevice);
        this.connectStatus.next(true);
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
          console.error('PARSING DATA SURVEY ERROR!', error);
          // this.notificationService.toast('PARSING DATA SURVEY ERROR!');
        }
        console.log(data);
      });
  }

  listBluetooth(): Observable<Bluetooth[]> {
    return from(this.bluetoothSerial.list());
  }

  connect(bluetooth: Bluetooth): Observable<boolean> {
    this.dataSurvey.next(null);
    return this.bluetoothSerial.connect(bluetooth.id)
      .pipe(
        map(() => {
          // this.notificationService.toast(`Connection success to ${bluetooth.name} - ${bluetooth.address}`)
          this.lastDevice.next(bluetooth);
          this.connectStatus.next(true);
          this.storageService.set(this.storageService.DEVICE_KEY, bluetooth);
          return true;
        }),
        catchError(err => {
          this.lastDevice.next(null);
          this.storageService.remove(this.storageService.DEVICE_KEY);
          console.error('CONNECT ERROR', err);
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
        this.lastDevice.next(null);
        this.storageService.remove(this.storageService.DEVICE_KEY);
        // this.notificationService.toast('Device disconnected.');
      });
  }

  send(command: string): Observable<boolean> {
    return from(this.bluetoothSerial.write(command))
      .pipe(
        catchError(err => {
          console.error('COMMAND FAILED', err);
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