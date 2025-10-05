import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CachingService } from '@core/services/caching-service/caching.service';

describe('CachingService', () => {
  let cachingService: CachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CachingService, provideZonelessChangeDetection()],
    });
    cachingService = TestBed.inject(CachingService);
  });

  it('should be created', () => {
    expect(cachingService).toBeTruthy();
  });

  it('should store and retrieve cached values', () => {
    const key = 'beer_1';
    const value = { id: 1, name: 'IPA' };

    cachingService.set(key, value);

    const result = cachingService.get(key);

    expect(result).toEqual(value);
  });

  it('should return null if key is not found', () => {
    const result = cachingService.get('nonexistent');
    expect(result).toBeNull();
  });

  it('should check existence of key correctly', () => {
    cachingService.set('beer_1', 'IPA');
    expect(cachingService.has('beer_1')).toBeTrue();
    expect(cachingService.has('beer_2')).toBeFalse();
  });

  it('should clear all cached values', () => {
    cachingService.set('beer_1', 'IPA');
    cachingService.set('beer_2', 'Lager');
    expect(cachingService.has('beer_1')).toBeTrue();
    expect(cachingService.has('beer_2')).toBeTrue();

    cachingService.clear();

    expect(cachingService.has('beer_1')).toBeFalse();
    expect(cachingService.has('beer_2')).toBeFalse();
    expect(cachingService.get('beer_1')).toBeNull();
  });

  it('should overwrite existing key with new value', () => {
    const key = 'beer';
    cachingService.set(key, { id: 1, name: 'IPA' });
    cachingService.set(key, { id: 1, name: 'Stout' });

    const result = cachingService.get(key);
    expect(result).toEqual({ id: 1, name: 'Stout' });
  });
});
