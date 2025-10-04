import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { BeerViewModel } from '@features/beers/types/types';
import { FallbackImageDirective } from '@root/shared/directives/fallback/fallback.directive';
@Component({
  selector: 'app-beer-modal',
  standalone: true,
  templateUrl: './beer-modal.component.html',
  styleUrl: './beer-modal.component.scss',
  imports: [ModalComponent, FallbackImageDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerModalComponent extends ModalComponent {
  protected beerData!: BeerViewModel;

  constructor(
    @Inject('CONTEXT') data: BeerViewModel,
    @Inject('CLOSE_MODAL') private readonly closeModal: (el: HTMLElement) => void
  ) {
    super();
    this.beerData = data;
  }

  closeBeerModal(el: HTMLElement) {
    this.closeModal(el);
  }
}
