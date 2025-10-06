import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormService } from '@features/beers/services/form.service';
import { IBeerFilters } from '@features/beers/types/types';

describe('FormService', () => {
  let formService: FormService;

  const filtersWithoutPage = {
    beer_name: 'ipa',
    abv_lt: 15,
    abv_gt: 0,
    sortBy: 'abv:asc',
    favoritesOnly: false,
  };
  const defaultFiltersWithoutPage = {
    beer_name: '',
    abv_gt: 0,
    abv_lt: 15,
    sortBy: 'name:asc',
    favoritesOnly: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    formService = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(formService).toBeTruthy();
  });

  it('should update form values with correct values', () => {
    formService.updateFormValues(filtersWithoutPage as IBeerFilters);

    expect(formService.formGroup.getRawValue()).toEqual(filtersWithoutPage);
  });

  it('should reset form values with default filters', () => {
    formService.resetFormValues();

    expect(formService.formGroup.getRawValue()).toEqual(defaultFiltersWithoutPage);
  });
});
