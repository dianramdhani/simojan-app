import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  constructor() { }

  message(payload: {}) {
    return `${JSON.stringify(payload)}\n`
  }
}