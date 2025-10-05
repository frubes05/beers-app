import { BeerFilters } from './features/beers/types/types';

export const BASE_URL = 'https://api.adscanner.tv/punkapi/v2/beers';
export const SESSION_STORAGE_KEY = 'key';

export const DEFAULT_FILTERS: BeerFilters = {
  beer_name: '',
  abv_gt: 0,
  abv_lt: 15,
  sortBy: 'name:asc',
  favoritesOnly: false,
  page: 1,
};

export const FALLBACK_IMAGE = 'assets/placeholder-beer.png';
