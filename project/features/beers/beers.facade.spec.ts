import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { BeersFacade } from './beers.facade';
import { BeersService } from '@features/beers/services/beers.service';
import { FavoritesService } from '@features/beers/services/favorites.service';
import { UrlService } from '@core/services/url-service/url.service';
import { FiltersService } from '@features/beers/services/filters.service';
import { BeerFilters, BeerViewModel } from '@features/beers/types/types';
import { mockBeer } from './components/beer-card/beer-card.component.spec';
import { mockFilters } from './components/beer-filters/beer-filters.component.spec';

describe('BeersFacade', () => {
  let facade: BeersFacade;
  let beersService: jasmine.SpyObj<BeersService>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;
  let filtersService: jasmine.SpyObj<FiltersService>;
  let urlService: jasmine.SpyObj<UrlService>;

  beforeEach(() => {
    beersService = jasmine.createSpyObj('BeersService', ['fetchBeers'], {
      beers: signal([mockBeer]),
      loading: signal(false),
      error: signal(null),
    });

    favoritesService = jasmine.createSpyObj('FavoritesService', ['toggleFavorite'], {
      favorites: signal([]),
    });

    filtersService = jasmine.createSpyObj('FiltersService', [], {
      filters: signal(mockFilters),
    });

    urlService = jasmine.createSpyObj('UrlService', [
      'navigateWithSearchParams',
      'navigateWithoutParams',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: BeersService, useValue: beersService },
        { provide: FavoritesService, useValue: favoritesService },
        { provide: FiltersService, useValue: filtersService },
        { provide: UrlService, useValue: urlService },
        provideZonelessChangeDetection(),
      ],
    });

    facade = TestBed.inject(BeersFacade);
  });

  it('should create the facade', () => {
    expect(facade).toBeTruthy();
  });

  it('should call fetchBeers via effect on init', async () => {
    await new Promise((resolve) => setTimeout(resolve, 0)); // setTimeout call to force it at the end

    expect(beersService.fetchBeers).toHaveBeenCalledOnceWith(mockFilters);
  });

  it('should call updateFilters correctly and reset page when resetPage is true', () => {
    const newFilters = { beer_name: 'lager' } as BeerFilters;

    facade.updateFilters(newFilters, true);

    expect(urlService.navigateWithSearchParams).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({ beer_name: 'lager', page: 1 }),
    );
  });

  it('should update filters without resetting page when resetPage is false', () => {
    const newFilters = { abv_lt: 10 } as BeerFilters;

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
    beersService.beers.set([mockBeer]);

    expect(facade.showPagination()).toBeTrue();
  });

  it('should compute showBackButton correctly', () => {
    filtersService.filters.set({ ...mockFilters, favoritesOnly: true });
    favoritesService.favorites.set([{ id: 99 } as BeerViewModel]);
    beersService.beers.set([{ id: 100 } as BeerViewModel]);

    expect(facade.showBackButton()).toBeTrue();
  });
});
