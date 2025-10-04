import { inject, Injectable, signal } from '@angular/core';
import { BeerViewModel } from '../types/types';
import { SessionStorageService } from '../../../core/services/session-storage-service/session-storage.service';

const key = 'beers';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  readonly sessionStorageService = inject(SessionStorageService);
  readonly favorites = signal<BeerViewModel[]>(JSON.parse(sessionStorage.getItem(key)! || '[]'));

  toggleFavorite(beer: BeerViewModel): void {
    const current = this.favorites();
    const exists = current.some((b) => b.id === beer.id);

    const updated = exists ? current.filter((b) => b.id !== beer.id) : [...current, beer];

    this.favorites.set(updated);

    if (updated.length === 0) {
      this.sessionStorageService.remove(key);
    } else {
      this.sessionStorageService.set(key, updated);
    }
  }
}
