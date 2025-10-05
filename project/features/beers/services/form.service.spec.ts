import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormService } from '@features/beers/services/form.service';
import { IBeerFilters } from '@features/beers/types/types';
import { DEFAULT_FILTERS } from '@root/app.constants';
import { mockFilters } from '../mocks/beers-mock';

describe('FormService', () => {
  let formService: FormService;

  const { page: pg, ...filtersWithoutPage } = mockFilters;
  const { page: dpg, ...defaultFiltersWithoutPage } = DEFAULT_FILTERS;

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
