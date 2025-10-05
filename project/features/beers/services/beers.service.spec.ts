import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BeersService } from '@features/beers/services/beers.service';
import { UrlService } from '@root/core/services/url-service/url.service';
import { FiltersService } from '@features/beers/services/filters.service';
import { CachingService } from '@root/core/services/caching-service/caching.service';
import { BASE_URL } from '@root/app.constants';
import { of, throwError } from 'rxjs';
import { mockFilters, mockBeer, mockParams } from '@features/beers/mocks/beers-mock';

describe('BeersService', () => {
  let beersService: BeersService;
  let urlService: UrlService;
  let httpClient: HttpClient;
  let cachingService: CachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', ['get']) },
        {
          provide: UrlService,
          useValue: jasmine.createSpyObj('UrlService', ['getSearchParamsFromObject']),
        },
        {
          provide: CachingService,
          useValue: jasmine.createSpyObj('CachingService', ['get', 'set']),
        },
        provideZonelessChangeDetection(),
        {
          provide: FiltersService,
          useValue: {
            filters: () => mockFilters,
          },
        },
      ],
    });

    beersService = TestBed.inject(BeersService);
    urlService = TestBed.inject(UrlService);
    httpClient = TestBed.inject(HttpClient);
    cachingService = TestBed.inject(CachingService);
  });

  it('should be created', () => {
    expect(beersService).toBeTruthy();
  });

  it('should fetch beers when not cached', async () => {
    (cachingService as any).get.and.returnValue(null);
    (httpClient as any).get.and.returnValue(of([mockBeer]));
    (urlService as any).getSearchParamsFromObject.and.returnValue(mockParams);

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
    (cachingService as any).get.and.returnValue([mockBeer]);
    (urlService as any).getSearchParamsFromObject.and.returnValue(mockParams);

    await new Promise((resolve) => setTimeout(resolve, 0));

    const result = beersService.beers();

    expect(result).toEqual([mockBeer]);
    expect(httpClient.get).not.toHaveBeenCalled();
    expect(beersService.loading()).toBeFalse();
  });

  it('should handle error during fetch', async () => {
    (cachingService as any).get.and.returnValue(null);
    (httpClient as any).get.and.returnValue(throwError(() => new Error('Failed')));
    (urlService as any).getSearchParamsFromObject.and.returnValue(mockParams);

    await new Promise((resolve) => setTimeout(resolve, 0));

    const result = beersService.beers();

    expect(beersService.error()).toBe('Failed to load beers');
    expect(result).toEqual([]);
    expect(beersService.loading()).toBeFalse();
  });
});
