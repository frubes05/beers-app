import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  get<T>(key: string): T | null {
    const sessionStorageItem = sessionStorage.getItem(key);
    return sessionStorageItem ? (JSON.parse(sessionStorageItem) as T) : null;
  }

  set<T>(key: string, value: T): void {
    const sessionStorageValue = JSON.stringify(value);
    sessionStorage.setItem(key, sessionStorageValue);
  }

  clear(): void {
    sessionStorage.clear();
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }
}
