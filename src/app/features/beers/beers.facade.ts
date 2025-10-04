import { inject, Injectable, signal, computed, effect } from '@angular/core';
import { BeersService } from '../beers/services/beers.service';
import { FavoritesService } from '../../features/beers/services/favorites.service';
import { UrlService } from '../../core/services/url-service/url.service';
import { mapBeersWithFilters } from '../beers/mappers/beer-mappers';
import { BeerFilters, BeerViewModel } from '../../features/beers/types/types';
import { FiltersService } from '../beers/services/filters.service';

export const DEFAULT_FILTERS: BeerFilters = {
  beer_name: '',
  abv_gt: 0,
  abv_lt: 15,
  sortBy: 'name:asc',
  favoritesOnly: false,
  page: 1,
};

@Injectable({ providedIn: 'root' })
export class BeersFacade {
  private readonly beersService = inject(BeersService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly urlService = inject(UrlService);
  private readonly filtersService = inject(FiltersService);

  private readonly searchPageParam = new URLSearchParams(window.location.search).get('page');
  readonly page = signal(this.searchPageParam ? +this.searchPageParam : 1);

  readonly loading = this.beersService.loading;
  readonly error = this.beersService.error;

  readonly filters = this.filtersService.filters();
  readonly favorites = this.favoritesService.favorites();

  readonly beers = computed<BeerViewModel[]>(() => {
    const beers = this.beersService.beers();
    const filters = this.filtersService.filters();
    const favorites = this.favoritesService.favorites();

    return mapBeersWithFilters(beers, filters, favorites);
  });

  readonly showPagination = computed<boolean>(() => {
    const error = Boolean(this.beersService.error());
    const beers = this.beersService.beers();

    return !error || beers.length > 0;
  });

  readonly showBackButton = computed<boolean>(() => {
    const filters = this.filtersService.filters();
    const beers = this.beersService.beers();
    const favorites = this.favoritesService.favorites();
    const favoriteIds = favorites.map((b) => b.id);

    return (
      filters.favoritesOnly &&
      !beers.some((beer) => favoriteIds.find((f) => f === beer.id)) &&
      this.showPagination()
    );
  });

  constructor() {
    effect(() => {
      const filters = this.filtersService.filters();
      this.beersService.fetchBeers(filters!);
    });
  }

  updateFilters(filters: BeerFilters, resetPage = true) {
    this.filtersService.filters.update((f) => ({
      ...f,
      ...filters,
      page: resetPage ? 1 : f?.page ?? 1,
    }));
    if (resetPage) {
      this.page.set(1);
    }
    this.urlService.navigateWithSearchParams(this.filtersService.filters() as Object);
  }

  goToPage(page: number) {
    this.page.set(page);
    this.filtersService.filters.update((f) => ({ ...(f as BeerFilters), page }));
    this.urlService.navigateWithSearchParams({ ...this.filtersService.filters(), page });
  }

  retry() {
    const currentFilters = this.filtersService.filters();
    this.updateFilters(currentFilters!, false);
  }

  resetFilters() {
    this.filtersService.filters.set(DEFAULT_FILTERS);
    this.page.set(1);
    this.urlService.navigateWithoutParams(true);
  }

  saveFavoriteBeer(beer: BeerViewModel) {
    this.favoritesService.toggleFavorite(beer);
  }
}
