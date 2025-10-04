import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BeerCardSkeletons } from '../beer-card/beer-card-skeletons/beer-card-skeletons.component';
import { BeerCardComponent } from '../beer-card/beer-card.component';
import { BeerListEmptyComponent } from './beer-list-empty/beer-list-empty.component';
import { ErrorComponent } from '../../../../shared/components/error/error.component';
import { BeersFacade } from '../../beers.facade';
import { BeerViewModel } from '../../types/types';

@Component({
  selector: 'app-beer-list',
  imports: [BeerCardSkeletons, BeerCardComponent, BeerListEmptyComponent, ErrorComponent],
  templateUrl: './beer-list.component.html',
  styleUrl: './beer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerListComponent {
  @Input({ required: true }) facade!: BeersFacade;
  @Output() detailsClicked = new EventEmitter<BeerViewModel>();

  handleDetailsClicked(event: BeerViewModel): void {
    this.detailsClicked.emit(event);
  }
}
