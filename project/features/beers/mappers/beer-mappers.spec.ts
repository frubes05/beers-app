import { mapBeersWithFilters } from '@features/beers/mappers/beer-mappers';
import { BeerViewModel } from '@features/beers/types/types';

describe('mapBeersWithFilters', () => {
  const beers: BeerViewModel[] = [
    { id: 1, name: 'IPA' } as BeerViewModel,
    { id: 2, name: 'Stout' } as BeerViewModel,
    { id: 3, name: 'Lager' } as BeerViewModel,
  ];

  const favorites: BeerViewModel[] = [{ id: 2, name: 'Stout' } as BeerViewModel];

  it('should sort beers by name desc when sortBy is "name:desc"', () => {
    const filters = {
      sortBy: 'name:desc',
    } as any;

    const result = mapBeersWithFilters(beers, filters, favorites);

    expect(result.map((b) => b.name)).toEqual(['Stout', 'Lager', 'IPA']);
  });

  it('should filter to favorites and sort', () => {
    const filters = {
      sortBy: 'name:asc',
      favoritesOnly: true,
    } as any;

    const result = mapBeersWithFilters(beers, filters, favorites);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe(2);
  });
});
