import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BeersService } from '../../features/services/beers.service';
import { BeerViewModel } from '../../types/types';

export const beersResolver: ResolveFn<BeerViewModel[]> = async (route) => {
  const beerService = inject(BeersService);

  return [];
};
