import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, merge } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly refreshSubject = new BehaviorSubject<void>(undefined);
  readonly refresh$ = this.refreshSubject.asObservable();

  readonly queryParams$ = merge(
    this.route.queryParams.pipe(
      debounceTime(300),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    ),
    this.refresh$.pipe(map(() => this.route.snapshot.queryParams))
  );

  triggerRefresh() {
    this.refreshSubject.next();
  }

  private getCleanParams(obj: Record<string, any>) {
    const clean: Record<string, any> = {};

    for (const key in obj) {
      const value = obj[key];

      if (value === null || value === undefined) continue;
      if (typeof value === 'string' && value.trim() === '') continue;

      clean[key] = value;
    }

    return clean;
  }

  getSearchParamsFromObject(obj: Record<string, any> | null): HttpParams {
    let params = new HttpParams();
    if (!obj) return params;

    const cleanedParams = this.getCleanParams(obj);

    Object.entries(cleanedParams).forEach(([key, value]) => {
      params = params.append(key, String(value));
    });

    return params;
  }

  getObjectFromSearchParams(params: URLSearchParams): object {
    const obj: { [key: string]: string } = {};

    for (const [key, value] of params.entries()) {
      obj[key] = value;
    }

    return obj;
  }

  async navigateWithSearchParams(params: Object): Promise<void> {
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.getCleanParams(params),
      replaceUrl: false,
    });
  }

  async navigateWithoutParams(isInitial?: boolean): Promise<void> {
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: isInitial ? {} : this.getCleanParams({}),
      replaceUrl: false,
    });
  }
}
