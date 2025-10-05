import { TestBed } from '@angular/core/testing';
import { SessionStorageService } from '@core/services/session-storage-service/session-storage.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SessionStorageService', () => {
  let sessionStorageService: SessionStorageService;

  const mockStorage: Record<string, string> = {};
  const mockSessionStorage = {
    getItem: (key: string) => mockStorage[key] || null,
    setItem: (key: string, value: string) => {
      mockStorage[key] = value;
    },
    removeItem: (key: string) => {
      delete mockStorage[key];
    },
    clear: () => {
      for (const key in mockStorage) delete mockStorage[key];
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageService, provideZonelessChangeDetection()],
    });
    sessionStorageService = TestBed.inject(SessionStorageService);

    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem').and.callFake(mockSessionStorage.removeItem);
    spyOn(sessionStorage, 'clear').and.callFake(mockSessionStorage.clear);
  });

  afterEach(() => {
    mockSessionStorage.clear();
  });

  it('should be created', () => {
    expect(sessionStorageService).toBeTruthy();
  });

  it('should set an item in sessionStorage', () => {
    sessionStorageService.set('user', { name: 'John' });

    expect(sessionStorage.setItem).toHaveBeenCalledOnceWith(
      'user',
      JSON.stringify({ name: 'John' }),
    );
  });

  it('should get an existing item from sessionStorage', () => {
    sessionStorage.setItem('user', JSON.stringify({ name: 'Alice' }));

    const result = sessionStorageService.get<{ name: string }>('user');
    expect(result).toEqual({ name: 'Alice' });
    expect(sessionStorage.getItem).toHaveBeenCalledWith('user');
  });

  it('should return null for missing key', () => {
    const result = sessionStorageService.get<{ id: number }>('missing');
    expect(result).toBeNull();
  });

  it('should remove an item from sessionStorage', () => {
    sessionStorage.setItem('token', 'abc123');
    sessionStorageService.remove('token');

    expect(sessionStorage.removeItem).toHaveBeenCalledOnceWith('token');
  });

  it('should clear all sessionStorage items', () => {
    sessionStorage.setItem('a', '1');
    sessionStorage.setItem('b', '2');

    sessionStorageService.clear();
    expect(sessionStorage.clear).toHaveBeenCalled();
  });
});
