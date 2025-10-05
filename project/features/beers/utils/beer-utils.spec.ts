import { sortBeers } from '@features/beers/utils/beer-utils';
import { BeerViewModel } from '@features/beers/types/types';

describe('sortBeers', () => {
  const beers: BeerViewModel[] = [
    { id: 2, name: 'Stout', abv: 8.0 } as BeerViewModel,
    { id: 1, name: 'IPA', abv: 6.5 } as BeerViewModel,
    { id: 3, name: 'Lager', abv: 4.8 } as BeerViewModel,
  ];

  it('should return original array if sortBy is undefined', () => {
    const result = sortBeers([...beers], undefined);
    expect(result).toEqual(beers);
  });

  it('should sort beers by name ascending', () => {
    const result = sortBeers([...beers], 'name:asc');
    expect(result.map((b) => b.name)).toEqual(['IPA', 'Lager', 'Stout']);
  });

  it('should sort beers by name descending', () => {
    const result = sortBeers([...beers], 'name:desc');
    expect(result.map((b) => b.name)).toEqual(['Stout', 'Lager', 'IPA']);
  });

  it('should sort beers by abv ascending', () => {
    const result = sortBeers([...beers], 'abv:asc');
    expect(result.map((b) => b.abv)).toEqual([4.8, 6.5, 8.0]);
  });

  it('should sort beers by abv descending', () => {
    const result = sortBeers([...beers], 'abv:desc');
    expect(result.map((b) => b.abv)).toEqual([8.0, 6.5, 4.8]);
  });

  it('should do nothing if sortBy field is of an unrecognized type', () => {
    const weirdBeers = [
      { id: 1, name: 'IPA', abv: 6.5, something: {} } as BeerViewModel & { something: any },
      { id: 2, name: 'Stout', abv: 8.0, something: {} } as BeerViewModel & { something: any },
    ];

    const result = sortBeers([...weirdBeers], 'something:asc');
    expect(result).toEqual(weirdBeers);
  });
});
