import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { IBeerFilters, IBeerViewModel } from '@features/beers/types/types';
import { UrlService } from '@core/services/url-service/url.service';
import { CachingService } from '@core/services/caching-service/caching.service';
import { switchMap, tap, catchError, of } from 'rxjs';
import { FiltersService } from './filters.service';
import { BASE_URL } from '@root/app.constants';

@Injectable({ providedIn: 'root' })
export class BeersService {
  private readonly http = inject(HttpClient);
  private readonly urlService = inject(UrlService);
  private readonly cachingService = inject(CachingService);
  private readonly filtersService = inject(FiltersService);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  beers!: Signal<IBeerViewModel[]>;

  constructor() {
    const filters$ = toObservable(this.filtersService.filters);

    const beers$ = filters$.pipe(
      tap(() => {
        this.loading.set(true);
        this.error.set(null);
      }),
      switchMap((filters: IBeerFilters) => {
        const params = this.urlService.getSearchParamsFromObject(filters);
        const urlWithParams = `${BASE_URL}?${params.toString()}`;

        const cached = this.cachingService.get<IBeerViewModel[]>(urlWithParams);
        if (cached) {
          this.loading.set(false);
          return of(cached);
        }

        return this.http.get<IBeerViewModel[]>(BASE_URL, { params }).pipe(
          tap((data) => this.cachingService.set(urlWithParams, data)),
          catchError(() => {
            this.error.set('Failed to load beers');
            this.loading.set(false);
            return of<IBeerViewModel[]>([]);
          }),
        );
      }),
      tap(() => this.loading.set(false)),
    );

    this.beers = toSignal(beers$, { initialValue: [] });
  }
}
