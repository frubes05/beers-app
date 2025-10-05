import { inject, Injectable, signal, computed } from '@angular/core';
import { BeersService } from '@features/beers/services/beers.service';
import { FavoritesService } from '@features/beers/services/favorites.service';
import { UrlService } from '@core/services/url-service/url.service';
import { mapBeersWithFilters } from '@features/beers/mappers/beer-mappers';
import { IBeerFilters, IBeerViewModel } from '@features/beers/types/types';
import { FiltersService } from '@features/beers/services/filters.service';
import { DEFAULT_FILTERS } from '@root/app.constants';

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

  readonly filters = this.filtersService.filters;
  readonly favorites = this.favoritesService.favorites;

  readonly beers = computed<IBeerViewModel[]>(() => {
    const beers = this.beersService.beers();
    const filters = this.filters();
    const favorites = this.favorites();

    return mapBeersWithFilters(beers, filters, favorites);
  });

  readonly showPagination = computed<boolean>(() => {
    const error = Boolean(this.error());
    const beers = this.beersService.beers();

    return !error || beers.length > 0;
  });

  readonly showBackButton = computed<boolean>(() => {
    const filters = this.filters();
    const beers = this.beersService.beers();
    const favoriteIds = this.favorites().map((b) => b.id);

    return (
      filters.favoritesOnly &&
      !beers.some((beer) => favoriteIds.includes(beer.id)) &&
      this.showPagination()
    );
  });

  updateFilters(filters: IBeerFilters, resetPage = true) {
    this.filtersService.isReset.set(false);
    this.filters.update((currentFilters) => ({
      ...currentFilters,
      ...filters,
      page: resetPage ? 1 : (currentFilters?.page ?? 1),
    }));

    if (resetPage) {
      this.page.set(1);
    }

    this.urlService.navigateWithSearchParams(this.filters() as Object);
  }

  goToPage(page: number) {
    this.page.set(page);
    this.filtersService.isReset.set(false);

    this.filters.update((currentFilters) => ({
      ...(currentFilters as IBeerFilters),
      page,
    }));

    this.urlService.navigateWithSearchParams({
      ...this.filters(),
      page,
    });
  }

  retry() {
    this.filtersService.isReset.set(false);
    const currentFilters = this.filters();
    this.updateFilters(currentFilters, false);
  }

  resetFilters() {
    this.filtersService.isReset.set(true);
    this.filters.set(DEFAULT_FILTERS);
    this.page.set(1);
    this.urlService.navigateWithoutParams(true);
  }

  saveFavoriteBeer(beer: IBeerViewModel) {
    this.favoritesService.toggleFavorite(beer);
  }
}
