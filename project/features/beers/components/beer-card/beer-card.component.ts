import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IBeerViewModel } from '@features/beers/types/types';
import { FallbackImageDirective } from '@shared/directives/fallback/fallback.directive';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-beer-card',
  imports: [MatButtonModule, MatCardModule, FallbackImageDirective, CardComponent],
  templateUrl: './beer-card.component.html',
  styleUrl: './beer-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerCardComponent {
  @Input() beer!: IBeerViewModel;
  @Output() favoritesClicked = new EventEmitter<IBeerViewModel>();
  @Output() detailsClicked = new EventEmitter<IBeerViewModel>();

  onFavoritesClick(beer: IBeerViewModel) {
    this.favoritesClicked.emit(beer);
  }

  onDetailsClick(beer: IBeerViewModel) {
    this.detailsClicked.emit(beer);
  }
}
