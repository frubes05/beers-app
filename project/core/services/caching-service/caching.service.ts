import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CachingService {
  private readonly cache = new Map<string, any>();

  get<T>(key: string): T | null {
    return this.cache.has(key) ? this.cache.get(key) : null;
  }

  set<T>(key: string, value: T): void {
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }
}
