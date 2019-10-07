import { Injectable } from '@angular/core';
import { KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  public valueAscOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.value > b.value ? 1 : -1;
  }

  constructor() { }

  deepClone(obj: any) {
    // return value is input is not an Object or Array.
    if (typeof(obj) !== 'object' || obj === null) {
      return obj;
    }
    let clone: any;
    if (Array.isArray(obj)) {
      clone = obj.slice();  // unlink Array reference.
    } else {
      clone = Object.assign({}, obj); // Unlink Object reference.
    }
    const keys = Object.keys(clone);
    for (let i = 0; i < keys.length; i++) {
      clone[keys[i]] = this.deepClone(clone[keys[i]]); // recursively unlink reference to nested objects.
    }
    return clone; // return unlinked clone.
  }
}
