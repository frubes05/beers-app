import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BeerViewModel } from '../../types/types';
import { FallbackImageDirective } from '../../directives/fallback/fallback.directive';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-beer-card',
  imports: [MatButtonModule, MatCardModule, FallbackImageDirective, Card],
  templateUrl: './beer-card.html',
  styleUrl: './beer-card.scss',
})
export class BeerCard {
  @Input() beer!: BeerViewModel;
  @Output() favoritesClicked = new EventEmitter<BeerViewModel>();
  @Output() detailsClicked = new EventEmitter<BeerViewModel>();

  onFavoritesClick(beer: BeerViewModel) {
    this.favoritesClicked.emit(beer);
  }

  onDetailsClick(beer: BeerViewModel) {
    this.detailsClicked.emit(beer);
  }
}
