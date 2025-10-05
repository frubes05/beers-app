import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { debounceTime, tap } from 'rxjs';
import { FiltersService } from '@features/beers/services/filters.service';
import { FormService } from '@features/beers/services/form.service';
import { IBeerFilters } from '@features/beers/types/types';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

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
export class BeerFiltersComponent {
  private readonly filtersService = inject(FiltersService);
  readonly formService = inject(FormService);

  readonly handleFormGroupChanges = toSignal(
    this.formService.formGroup.valueChanges.pipe(
      debounceTime(300),
      tap((formValues) => {
        this.filtersService.updateFilters(formValues as IBeerFilters);
      }),
    ),
  );

  readonly handleFiltersChanges = toSignal(
    toObservable(this.filtersService.filters).pipe(
      tap((filters) => {
        this.formService.updateFormValues(filters);
      }),
    ),
  );
}
