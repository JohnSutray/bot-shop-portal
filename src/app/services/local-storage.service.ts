import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly storage = localStorage;

  put<TValue>(key: string, value: TValue): void {
    console.log(value);
    this.storage.setItem(key, JSON.stringify(value));
  }

  get<TValue>(key: string): TValue {
    return JSON.parse(this.storage.getItem(key));
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }
}
