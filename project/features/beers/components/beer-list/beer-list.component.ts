import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BeerCardSkeletons } from '@features/beers/components/beer-card/beer-card-skeletons/beer-card-skeletons.component';
import { BeerCardComponent } from '@features/beers/components/beer-card/beer-card.component';
import { BeerListEmptyComponent } from '@features/beers/components/beer-list/beer-list-empty/beer-list-empty.component';
import { ErrorComponent } from '@shared/components/error/error.component';
import { BeersFacade } from '@features/beers/beers.facade';
import { BeerViewModel } from '@features/beers/types/types';

@Component({
  selector: 'app-beer-list',
  imports: [BeerCardSkeletons, BeerCardComponent, BeerListEmptyComponent, ErrorComponent],
  templateUrl: './beer-list.component.html',
  styleUrl: './beer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerListComponent {
  @Input({ required: true }) error!: string | null;
  @Input({ required: true }) loading!: boolean;
  @Input({ required: true }) beers!: Array<BeerViewModel>;

  @Output() detailsClicked = new EventEmitter<BeerViewModel>();
  @Output() savedFavoriteBeer = new EventEmitter<BeerViewModel>();
  @Output() retryClicked = new EventEmitter();
  @Output() resetFiltersClicked = new EventEmitter();

  handleDetailsClicked(event: BeerViewModel): void {
    this.detailsClicked.emit(event);
  }
}
