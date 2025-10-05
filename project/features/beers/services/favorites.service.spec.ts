import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { mockBeer } from '@features/beers/components/beer-card/beer-card.component.spec';
import { FavoritesService } from '@features/beers/services/favorites.service';
import { SessionStorageService } from '@root/core/services/session-storage-service/session-storage.service';

describe('FavoritesService', () => {
  let favoritesService: FavoritesService;
  let sessionStorageService: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    favoritesService = TestBed.inject(FavoritesService);
    sessionStorageService = TestBed.inject(SessionStorageService);
  });

  it('should be created', () => {
    expect(favoritesService).toBeTruthy();
  });

  it('should delete or add to session storage on toggleFavorite call', () => {
    spyOn(sessionStorageService, 'set');
    spyOn(sessionStorageService, 'remove');

    favoritesService.toggleFavorite(mockBeer);

    expect(sessionStorageService.set).toHaveBeenCalledOnceWith('beers', [Object(mockBeer)]);

    favoritesService.toggleFavorite(mockBeer);

    expect(sessionStorageService.remove).toHaveBeenCalledOnceWith('beers');
  });
});
