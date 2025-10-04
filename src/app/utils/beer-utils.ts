import { BeerViewModel } from '../types/types';

export function sortBeers(beers: BeerViewModel[], sortBy: string | undefined): BeerViewModel[] {
  if (!sortBy) return beers;

  const [key, direction] = sortBy.split(':') as [keyof BeerViewModel, 'asc' | 'desc'];

  return beers.sort((a, b) => {
    const one = a[key];
    const two = b[key];

    if (typeof one === 'string' && typeof two === 'string') {
      return direction === 'asc' ? one.localeCompare(two) : two.localeCompare(one);
    }

    if (typeof one === 'number' && typeof two === 'number') {
      return direction === 'asc' ? one - two : two - one;
    }

    return 0;
  });
}
