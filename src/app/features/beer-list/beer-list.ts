import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BeerCardSkeletons } from '../beer-card/beer-card-skeletons/beer-card-skeletons';
import { BeerCard } from '../beer-card/beer-card';
import { BeerListEmpty } from './beer-list-empty/beer-list-empty.component';
import { ErrorComponent } from '../../components/error/error.component';
import { BeersFacade } from '../../facades/beers/beers.facade';
import { BeerViewModel } from '../../types/types';

@Component({
  selector: 'app-beer-list',
  imports: [BeerCardSkeletons, BeerCard, BeerListEmpty, ErrorComponent],
  templateUrl: './beer-list.html',
  styleUrl: './beer-list.scss',
})
export class BeerList {
  @Input({ required: true }) facade!: BeersFacade;
  @Output() detailsClicked = new EventEmitter<BeerViewModel>();

  handleDetailsClicked(event: BeerViewModel): void {
    this.detailsClicked.emit(event);
  }
}
