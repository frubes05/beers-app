import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FiltersService } from './filters.service';
import { UrlService } from '@root/core/services/url-service/url.service';
import { mockFilters } from '../components/beer-filters/beer-filters.component.spec';
import { DEFAULT_FILTERS } from '../beers.facade';

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
