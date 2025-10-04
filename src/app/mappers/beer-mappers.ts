import { BeerFilters, BeerViewModel } from '../types/types';
import { sortBeers } from '../utils/beer-utils';

export function mapBeersWithFilters(
  beers: BeerViewModel[],
  filters: BeerFilters | null,
  favorites: BeerViewModel[]
): BeerViewModel[] {
  if (!filters) return beers;

  const favoriteIds = new Set(favorites.map((b) => b.id));

  let enriched: BeerViewModel[] = beers.map((beer) => ({
    ...beer,
    isFavorite: favoriteIds.has(beer.id),
  }));

  if (filters.favoritesOnly) {
    enriched = enriched.filter((beer) => beer.isFavorite);
  }

  if (filters.sortBy) {
    enriched = sortBeers(enriched, filters.sortBy);
  }

  return enriched;
}
