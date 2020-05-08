import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  readonly DEVICE_KEY = 'DEVICE';

  constructor() { }

  set(key: string, value: any): Promise<void> {
    return Storage.set({
      key: key,
      value: JSON.stringify(value)
    });
  }

  async get(key: string): Promise<any> {
    const item = await Storage.get({ key: key });
    return JSON.parse(item.value);
  }

  remove(key: string): Promise<void> {
    return Storage.remove({
      key: key
    });
  }
}