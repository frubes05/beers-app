import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { debounceTime, Subscription } from 'rxjs';
import { FiltersService } from '@features/beers/services/filters.service';
import { FormService } from '@features/beers/services/form.service';
import { BeerFilters as BeerFiltersType } from '@features/beers/types/types';

@Component({
  selector: 'app-beer-filters',
  standalone: true,
  imports: [
    MatSliderModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './beer-filters.component.html',
  styleUrls: ['./beer-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerFiltersComponent implements OnDestroy {
  private readonly subscription = new Subscription();
  private readonly filtersService = inject(FiltersService);
  readonly formService = inject(FormService);

  constructor() {
    effect(() => {
      const filters = this.filtersService.filters();
      filters ? this.formService.updateFormValues(filters) : this.formService.resetFormValues();
    });

    this.subscription.add(
      this.formService.formGroup.valueChanges.pipe(debounceTime(300)).subscribe(() => {
        const value = this.formService.formGroup.getRawValue();
        this.filtersService.updateFilters(value as BeerFiltersType);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
