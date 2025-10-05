import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BeersService } from '@features/beers/services/beers.service';
import { UrlService } from '@root/core/services/url-service/url.service';
import { mockFilters } from '@features/beers/components/beer-filters/beer-filters.component.spec';
import { mockBeer } from '@features/beers/components/beer-card/beer-card.component.spec';
import { CachingService } from '@root/core/services/caching-service/caching.service';
import { BASE_URL } from '@root/app.constants';

describe('BeersService', () => {
  let beersService: BeersService;
  let httpClient: HttpClient;
  let cachingService: CachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: jasmine.createSpy('get').and.returnValue({
              pipe: () => ({
                subscribe: ({ next }: any) => next(mockBeer),
              }),
            }),
          },
        },
        { provide: ActivatedRoute, useValue: ActivatedRoute },
        {
          provide: UrlService,
          useValue: {
            getSearchParamsFromObject: jasmine
              .createSpy('getSearchParamsFromObject')
              .and.returnValue(mockBeer),
          },
        },
        provideZonelessChangeDetection(),
      ],
    });
    beersService = TestBed.inject(BeersService);
    httpClient = TestBed.inject(HttpClient);
    cachingService = TestBed.inject(CachingService);
  });

  it('should be created', () => {
    expect(beersService).toBeTruthy();
  });

  it('should fetch new beers if nothing is cached', () => {
    expect(httpClient.get).toHaveBeenCalledOnceWith(BASE_URL, {
      params: { name: 'Beer_1', id: 10, isFavorite: false },
    });
  });

  it('should fetch new beers if nothing is cached', () => {
    (cachingService as any).get = jasmine.createSpy('get').and.returnValue(mockBeer);

    expect(beersService.beers()).toEqual(Object(mockBeer));
    expect(httpClient.get).not.toHaveBeenCalledOnceWith(BASE_URL, {
      params: { name: 'Beer_1', id: 10, isFavorite: false },
    });
  });

  it('should handle fetchBeers error correctly', () => {
    (cachingService as any).get = jasmine.createSpy('get').and.returnValue(null);
    (httpClient as any).get = jasmine.createSpy('get').and.returnValue({
      pipe: () => ({ subscribe: (obs: any) => obs.error() }),
    });

    expect(beersService.error()).toBe('Failed to load beers');
    expect(beersService.beers()).toEqual([]);
    expect(beersService.loading()).toBeFalse();
  });
});
