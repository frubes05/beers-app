import { mapBeersWithFilters } from '@features/beers/mappers/beer-mappers';
import { IBeerViewModel } from '@features/beers/types/types';

describe('mapBeersWithFilters', () => {
  const beers: IBeerViewModel[] = [
    { id: 1, name: 'IPA' } as IBeerViewModel,
    { id: 2, name: 'Stout' } as IBeerViewModel,
    { id: 3, name: 'Lager' } as IBeerViewModel,
  ];

  const favorites: IBeerViewModel[] = [{ id: 2, name: 'Stout' } as IBeerViewModel];

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
