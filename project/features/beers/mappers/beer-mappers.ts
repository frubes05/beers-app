import { BeerFilters, BeerViewModel } from '@features/beers/types/types';
import { sortBeers } from '@features/beers/utils/beer-utils';

export function mapBeersWithFilters(
  beers: BeerViewModel[],
  filters: BeerFilters | null,
  favorites: BeerViewModel[],
): BeerViewModel[] {
  if (!filters) return beers;

  const favoriteIds = new Set(favorites.map((b) => b.id));

  let completeBeers: BeerViewModel[] = beers.map((beer) => ({
    ...beer,
    isFavorite: favoriteIds.has(beer.id),
  }));

  if (filters.favoritesOnly) {
    completeBeers = completeBeers.filter((beer) => beer.isFavorite);
  }

  if (filters.sortBy) {
    completeBeers = sortBeers(completeBeers, filters.sortBy);
  }

  return completeBeers;
}
