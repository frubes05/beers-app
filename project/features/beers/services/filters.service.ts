import { inject, Injectable, signal } from '@angular/core';
import { IBeerFilters } from '@features/beers/types/types';
import { UrlService } from '@core/services/url-service/url.service';
import { DEFAULT_FILTERS } from '@root/app.constants';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  private readonly urlService = inject(UrlService);
  readonly isReset = signal(false);

  readonly filters = signal<IBeerFilters>(
    (() => {
      const urlParams = this.urlService.getObjectFromSearchParams(
        new URLSearchParams(window.location.search),
      ) as Partial<IBeerFilters>;
      return { ...DEFAULT_FILTERS, ...urlParams };
    })(),
  );
  readonly filters$ = toObservable(this.filters);

  updateFilters(partial: IBeerFilters) {
    if (!this.filters()) return;

    const updated = { ...this.filters(), ...partial };
    updated.page = Object.hasOwn(partial, 'page') ? 1 : updated.page;
    this.filters.set(updated);
    this.isReset()
      ? this.urlService.navigateWithoutParams()
      : this.urlService.navigateWithSearchParams(updated);
  }

  resetFilters() {
    this.filters.set(DEFAULT_FILTERS);
    this.urlService.navigateWithoutParams(true);
  }
}
