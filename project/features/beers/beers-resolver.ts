import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BeersService } from '@features/beers/services/beers.service';
import { BeerViewModel } from '@features/beers/types/types';

export const beersResolver: ResolveFn<BeerViewModel[]> = async (route) => {
  const beerService = inject(BeersService);

  return [];
};
