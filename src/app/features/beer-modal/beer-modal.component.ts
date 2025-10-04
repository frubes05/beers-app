import { Component, Inject } from '@angular/core';
import { Modal } from '../../components/modal/modal';
import { BeerViewModel } from '../../types/types';
@Component({
  selector: 'app-beer-modal',
  standalone: true,
  templateUrl: './beer-modal.component.html',
  styleUrl: './beer-modal.component.scss',
  imports: [Modal],
})
export class BeerModalComponent extends Modal<BeerViewModel> {
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
