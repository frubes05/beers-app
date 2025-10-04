import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BeerFilters } from '@features/beers/types/types';
import { DEFAULT_FILTERS } from '@features/beers/beers.facade';

@Injectable({ providedIn: 'root' })
export class FormService {
  readonly formGroup = new FormGroup({
    beer_name: new FormControl('', { nonNullable: true, updateOn: 'blur' }),
    abv_gt: new FormControl(0, { nonNullable: true, updateOn: 'blur' }),
    abv_lt: new FormControl(15, { nonNullable: true, updateOn: 'blur' }),
    sortBy: new FormControl('name:asc', { nonNullable: true }),
    favoritesOnly: new FormControl(false, { nonNullable: true }),
  });

  updateFormValues(values: BeerFilters): void {
    this.formGroup.patchValue(values, {
      emitEvent: false,
    });
  }

  resetFormValues(): void {
    this.formGroup.reset(
      {
        ...DEFAULT_FILTERS,
      },
      { emitEvent: true },
    );
    this.formGroup.updateValueAndValidity({ emitEvent: true });
  }
}
