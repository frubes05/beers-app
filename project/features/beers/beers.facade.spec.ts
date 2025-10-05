import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { BeersFacade } from '@features/beers/beers.facade';
import { BeersService } from '@features/beers/services/beers.service';
import { FavoritesService } from '@features/beers/services/favorites.service';
import { UrlService } from '@core/services/url-service/url.service';
import { FiltersService } from '@features/beers/services/filters.service';
import { IBeerFilters, IBeerViewModel } from '@features/beers/types/types';
import { mockBeer, mockFilters } from '@features/beers/mocks/beers-mock';

describe('BeersFacade', () => {
  let facade: BeersFacade;
  let beersService: BeersService;
  let favoritesService: FavoritesService;
  let filtersService: FiltersService;
  let urlService: UrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BeersService,
          useValue: jasmine.createSpyObj('BeersService', ['fetchBeers'], {
            beers: signal([mockBeer]),
            loading: signal(false),
            error: signal(null),
          }),
        },
        {
          provide: FavoritesService,
          useValue: jasmine.createSpyObj('FavoritesService', ['toggleFavorite'], {
            favorites: signal([]),
          }),
        },
        {
          provide: FiltersService,
          useValue: jasmine.createSpyObj('FiltersService', [], {
            filters: signal(mockFilters),
            isReset: signal(false),
          }),
        },
        {
          provide: UrlService,
          useValue: (urlService = jasmine.createSpyObj('UrlService', [
            'navigateWithSearchParams',
            'navigateWithoutParams',
          ])),
        },
        provideZonelessChangeDetection(),
      ],
    });

    facade = TestBed.inject(BeersFacade);
    beersService = TestBed.inject(BeersService);
    favoritesService = TestBed.inject(FavoritesService);
    filtersService = TestBed.inject(FiltersService);
    urlService = TestBed.inject(UrlService);
  });

  it('should create the facade', () => {
    expect(facade).toBeTruthy();
  });

  it('should call updateFilters correctly and reset page when resetPage is true', () => {
    const newFilters = { beer_name: 'lager' } as IBeerFilters;

    facade.updateFilters(newFilters, true);

    expect(urlService.navigateWithSearchParams).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({ beer_name: 'lager', page: 1 }),
    );
  });

  it('should update filters without resetting page when resetPage is false', () => {
    const newFilters = { abv_lt: 10 } as IBeerFilters;

    facade.updateFilters(newFilters, false);

    expect(urlService.navigateWithSearchParams).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({ abv_lt: 10 }),
    );
  });

  it('should navigate to specific page on goToPage', () => {
    facade.goToPage(3);

    expect(urlService.navigateWithSearchParams).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({ page: 3 }),
    );
  });

  it('should retry by calling updateFilters with resetPage = false', () => {
    spyOn(facade, 'updateFilters');
    facade.retry();

    expect(facade.updateFilters).toHaveBeenCalledOnceWith(mockFilters, false);
  });

  it('should reset filters and navigate without params', () => {
    facade.resetFilters();

    expect(urlService.navigateWithoutParams).toHaveBeenCalledOnceWith(true);
  });

  it('should save favorite beer', () => {
    facade.saveFavoriteBeer(mockBeer);

    expect(favoritesService.toggleFavorite).toHaveBeenCalledOnceWith(mockBeer);
  });

  it('should compute beers list using mapBeersWithFilters', () => {
    const result = facade.beers();
    expect(result).toEqual([mockBeer]);
  });

  it('should compute showPagination correctly', () => {
    beersService.error.set(null);

    expect(facade.showPagination()).toBeTrue();
  });

  it('should compute showBackButton correctly', () => {
    filtersService.filters.set({ ...mockFilters, favoritesOnly: true });
    favoritesService.favorites.set([{ id: 99 } as IBeerViewModel]);

    expect(facade.showBackButton()).toBeTrue();
  });
});
