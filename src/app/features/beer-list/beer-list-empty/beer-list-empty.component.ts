import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-beer-list-empty',
  imports: [MatButton],
  templateUrl: './beer-list-empty.component.html',
  styleUrl: './beer-list-empty.component.scss',
  providers: [FormService],
})
export class BeerListEmpty {
  private readonly formService = inject(FormService);
  @Output() filtersRemoved = new EventEmitter();

  onFiltersRemoved(): void {
    this.filtersRemoved.emit();
    this.formService.resetFormValues();
  }
}
