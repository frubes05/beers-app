import { inject, Injectable, signal } from '@angular/core';
import { BeerFilters } from '@features/beers/types/types';
import { UrlService } from '@core/services/url-service/url.service';
import { DEFAULT_FILTERS } from '@root/app.constants';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  private readonly urlService = inject(UrlService);

  readonly filters = signal<BeerFilters>(
    (() => {
      const urlParams = this.urlService.getObjectFromSearchParams(
        new URLSearchParams(window.location.search),
      ) as Partial<BeerFilters>;
      return { ...DEFAULT_FILTERS, ...urlParams };
    })(),
  );

  updateFilters(partial: BeerFilters) {
    if (!this.filters()) return;

    const updated = { ...this.filters(), ...partial };
    updated.page = Object.hasOwn(partial, 'page') ? 1 : updated.page;
    this.filters.set(updated);
    this.urlService.navigateWithSearchParams(updated);
  }

  resetFilters() {
    this.filters.set(DEFAULT_FILTERS);
    this.urlService.navigateWithoutParams(true);
  }
}
