import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BeerFilters, BeerViewModel } from '@features/beers/types/types';
import { UrlService } from '@core/services/url-service/url.service';
import { CachingService } from '@core/services/caching-service/caching.service';
import { distinctUntilChanged } from 'rxjs';

const BASE_URL = 'https://api.adscanner.tv/punkapi/v2/beers';

@Injectable({ providedIn: 'root' })
export class BeersService {
  private readonly http = inject(HttpClient);
  private readonly urlService = inject(UrlService);
  private readonly cachingService = inject(CachingService);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly beers = signal<BeerViewModel[]>([]);

  readonly fetchBeers = (filters: BeerFilters) => {
    const params = this.urlService.getSearchParamsFromObject(filters);
    const urlWithParams = `${BASE_URL}?${params.toString()}`;

    const cached = this.cachingService.get<BeerViewModel[]>(urlWithParams);
    if (cached) {
      this.beers.set(cached);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<BeerViewModel[]>(BASE_URL, { params })
      .pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe({
        next: (data) => {
          this.cachingService.set(urlWithParams, data);
          this.beers.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Failed to load beers');
          this.beers.set([]);
          this.loading.set(false);
        },
      });
  };
}
