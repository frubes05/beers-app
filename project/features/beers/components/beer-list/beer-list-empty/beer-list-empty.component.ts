import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { FormService } from '@features/beers/services/form.service';

@Component({
  selector: 'app-beer-list-empty',
  imports: [MatButton],
  templateUrl: './beer-list-empty.component.html',
  styleUrl: './beer-list-empty.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerListEmptyComponent {
  private readonly formService = inject(FormService);
  @Output() resetFiltersClicked = new EventEmitter();

  onFiltersRemoved(): void {
    this.resetFiltersClicked.emit();
    this.formService.resetFormValues();
  }
}
