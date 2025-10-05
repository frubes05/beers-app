import { FormControl, FormGroup } from '@angular/forms';
import { IBeerFilters, IBeerViewModel } from '../types/types';
import { HttpParams } from '@angular/common/http';

export const mockBeer = {
  name: 'Beer_1',
  id: 10,
  isFavorite: false,
} as unknown as IBeerViewModel;

export const mockParams = new URLSearchParams({
  name: 'Beer_1',
  id: '10',
  isFavorite: 'false',
}) as unknown as HttpParams;

export const mockFilters: IBeerFilters = {
  beer_name: 'ipa',
  abv_lt: 15,
  abv_gt: 0,
  sortBy: 'abv:asc',
  favoritesOnly: false,
  page: 1,
};

export const mockFormGroup = new FormGroup({
  beer_name: new FormControl('', { nonNullable: true, updateOn: 'blur' }),
  abv_gt: new FormControl(0, { nonNullable: true, updateOn: 'blur' }),
  abv_lt: new FormControl(15, { nonNullable: true, updateOn: 'blur' }),
  sortBy: new FormControl('abv:asc', { nonNullable: true }),
  favoritesOnly: new FormControl(false, { nonNullable: true }),
});
