import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FiltersService } from '@features/beers/services/filters.service';
import { UrlService } from '@root/core/services/url-service/url.service';
import { mockFilters } from '@features/beers/mocks/beers-mock';
import { DEFAULT_FILTERS } from '@root/app.constants';

describe('FiltersService', () => {
  let filtersService: FiltersService;
  let urlService: UrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UrlService,
          useValue: {
            getObjectFromSearchParams: jasmine
              .createSpy('getObjectFromSearchParams')
              .and.returnValue(mockFilters),
            navigateWithSearchParams: jasmine.createSpy('navigateWithSearchParams'),
            navigateWithoutParams: jasmine.createSpy('navigateWithoutSearchParams'),
          },
        },
        provideZonelessChangeDetection(),
      ],
    });
    filtersService = TestBed.inject(FiltersService);
    urlService = TestBed.inject(UrlService);
  });

  it('should be created', () => {
    expect(filtersService).toBeTruthy();
  });

  it('should update filters and route the page with those filters as params', () => {
    filtersService.updateFilters(mockFilters);

    expect(filtersService.filters()).toEqual(mockFilters);
    expect(urlService.navigateWithSearchParams).toHaveBeenCalledOnceWith(mockFilters);
  });

  it('should reset filters and route the page without any params', () => {
    filtersService.resetFilters();

    expect(filtersService.filters()).toEqual(DEFAULT_FILTERS);
    expect(urlService.navigateWithoutParams).toHaveBeenCalledOnceWith(true);
  });
});
