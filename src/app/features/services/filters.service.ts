import { inject, Injectable, signal } from '@angular/core';
import { BeerFilters } from '../../types/types';
import { UrlService } from '../../services/url/url.service';
import { DEFAULT_FILTERS } from '../../facades/beers/beers.facade';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  private readonly urlService = inject(UrlService);

  readonly filters = signal<BeerFilters>(
    (() => {
      const urlParams = this.urlService.getObjectFromSearchParams(
        new URLSearchParams(window.location.search)
      ) as Partial<BeerFilters>;
      return { ...DEFAULT_FILTERS, ...urlParams };
    })()
  );

  updateFilters(partial: BeerFilters) {
    if (!this.filters()) return;

    const updated = { ...this.filters(), ...partial };
    if (!('page' in partial)) {
      updated.page = 1;
    }
    this.filters.set(updated);
    this.urlService.navigateWithSearchParams(updated);
  }

  resetFilters() {
    this.filters.set(DEFAULT_FILTERS);
    this.urlService.navigateWithoutParams(true);
  }
}
