import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BeersService } from '@features/beers/services/beers.service';
import { UrlService } from '@root/core/services/url-service/url.service';
import { FiltersService } from '@features/beers/services/filters.service';
import { CachingService } from '@root/core/services/caching-service/caching.service';
import { BASE_URL } from '@root/app.constants';
import { of, Subject, throwError } from 'rxjs';
import { mockFilters, mockBeer, mockParams } from '@features/beers/mocks/beers-mock';
import { IBeerFilters } from '@features/beers/types/types';

describe('BeersService', () => {
  let beersService: BeersService;
  let httpClient: HttpClient;
  let cachingService: CachingService;
  let filtersSubject: Subject<IBeerFilters>;

  beforeEach(() => {
    filtersSubject = new Subject();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: jasmine.createSpy('get').and.returnValue(of([mockBeer])),
          },
        },
        {
          provide: UrlService,
          useValue: {
            getSearchParamsFromObject: jasmine
              .createSpy('getSearchParamsFromObject')
              .and.returnValue(mockParams),
          },
        },
        {
          provide: CachingService,
          useValue: {
            get: jasmine.createSpy('get').and.returnValue(null),
            set: jasmine.createSpy('set'),
          },
        },
        provideZonelessChangeDetection(),
        {
          provide: FiltersService,
          useValue: {
            filters: () => mockFilters,
            filters$: filtersSubject.asObservable(),
          },
        },
      ],
    });

    beersService = TestBed.inject(BeersService);
    httpClient = TestBed.inject(HttpClient);
    cachingService = TestBed.inject(CachingService);
  });

  it('should be created', () => {
    expect(beersService).toBeTruthy();
  });

  it('should fetch beers when not cached', async () => {
    (cachingService.get as any).and.returnValue(null);
    (httpClient.get as any).and.returnValue(of([mockBeer]));

    filtersSubject.next(mockFilters);

    await new Promise((resolve) => setTimeout(resolve, 0));

    const result = beersService.beers();

    expect(result).toEqual([mockBeer]);
    expect(beersService.loading()).toBeFalse();
    expect(cachingService.set).toHaveBeenCalledWith(
      `${BASE_URL}?name=Beer_1&id=10&isFavorite=false`,
      [mockBeer],
    );
    expect(httpClient.get).toHaveBeenCalledWith(BASE_URL, { params: mockParams });
  });

  it('should return beers from cache if available', async () => {
    (cachingService.get as any).and.returnValue([mockBeer]);

    filtersSubject.next(mockFilters);

    await new Promise((resolve) => setTimeout(resolve, 0));

    const result = beersService.beers();

    expect(result).toEqual([mockBeer]);
    expect(httpClient.get).not.toHaveBeenCalled();
    expect(beersService.loading()).toBeFalse();
  });

  it('should handle error during fetch', async () => {
    (cachingService.get as any).and.returnValue(null);
    (httpClient.get as any).and.returnValue(throwError(() => new Error('Failed')));

    filtersSubject.next(mockFilters);

    await new Promise((resolve) => setTimeout(resolve, 0));

    const result = beersService.beers();

    expect(beersService.error()).toBe('Failed to load beers');
    expect(result).toEqual([]);
    expect(beersService.loading()).toBeFalse();
  });
});
