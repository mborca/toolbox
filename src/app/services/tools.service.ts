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

  setUnits(units: string, data: any) {
    data.units = units;
    for (const prop of Object.keys(data.settings)) {
      for (const breakpoint of Object.keys(data.settings[prop])) {
        const val = Number(data.settings[prop][breakpoint]);
        if (!isNaN(val)) {
          switch (units) {
            case 'rem':
              data.settings[prop][breakpoint] /= 16;
              break;
            case 'px':
              data.settings[prop][breakpoint] *= 16;
              break;
            default:
              throw new Error('Unsupported unit: ' + units);
          }
        }
      }
    }
  }

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
    for (const key of Object.keys(clone)) {
      clone[key] = this.deepClone(clone[key]); // recursively unlink reference to nested objects.
    }
    return clone; // return unlinked clone.
  }

  lzwCompress(uncompressed: string) {
    // Initialize dictionary
    const dictionary = {};
    for (let i = 0; i < 256; i++) {
      dictionary[String.fromCharCode(i)] = i;
    }
    let word = '';
    const result = [];
    let dictSize = 256;
    for (let i = 0, len = uncompressed.length; i < len; i++) {
      const curChar = uncompressed[i];
      const joinedWord = word + curChar;
      // Do not use dictionary[joinedWord] because javascript objects
      // will return values for myObject['toString']
      if (dictionary.hasOwnProperty(joinedWord)) {
        word = joinedWord;
      } else {
        result.push(dictionary[word]);
        // Add wc to the dictionary.
        dictionary[joinedWord] = dictSize++;
        word = curChar;
      }
    }
    if (word !== '') {
      result.push(dictionary[word]);
    }
    return result;
  }

  lzwUncompress(compressed: any) {
    // Initialize Dictionary (inverse of compress)
    const dictionary = {};
    for (let i = 0; i < 256; i++) {
      dictionary[i] = String.fromCharCode(i);
    }
    let word = String.fromCharCode(compressed[0]);
    let result = word;
    let entry = '';
    let dictSize = 256;
    for (let i = 1, len = compressed.length; i < len; i++) {
      const curNumber = compressed[i];
      if (dictionary[curNumber] !== undefined) {
        entry = dictionary[curNumber];
      } else {
        if (curNumber === dictSize) {
          entry = word + word[0];
        } else {
          throw new Error('Error in processing');
        }
      }
      result += entry;
      // Add word + entry[0] to dictionary
      dictionary[dictSize++] = word + entry[0];
      word = entry;
    }
    return result;
  }

  compress(input: object): string {
    return input ? btoa(JSON.stringify(input)) : null;
  }

  uncompress(input: string): object {
    return input ? JSON.parse(this.uncompressStr(input)) : null;
  }

  uncompressStr(input: string): string {
    try {
      return input ? atob(input) : null;
    } catch {
      return null;
    }
  }
}
