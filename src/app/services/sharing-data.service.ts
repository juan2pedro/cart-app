import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingDataService {
  private _idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  constructor() {}
  get idProductEventEmitter(): EventEmitter<number> {
    return this._idProductEventEmitter;
  }
}
