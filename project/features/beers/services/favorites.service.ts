import { inject, Injectable, signal } from '@angular/core';
import { IBeerViewModel } from '@features/beers/types/types';
import { SessionStorageService } from '@core/services/session-storage-service/session-storage.service';
import { SESSION_STORAGE_KEY } from '@root/app.constants';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  readonly sessionStorageService = inject(SessionStorageService);
  readonly favorites = signal<IBeerViewModel[]>(
    JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)! || '[]'),
  );

  toggleFavorite(beer: IBeerViewModel): void {
    const current = this.favorites();
    const exists = current.some((b) => b.id === beer.id);
    const updated = exists ? current.filter((b) => b.id !== beer.id) : [...current, beer];
    updated.length === 0
      ? this.sessionStorageService.remove(SESSION_STORAGE_KEY)
      : this.sessionStorageService.set(SESSION_STORAGE_KEY, updated);
    this.favorites.set(updated);
  }
}
