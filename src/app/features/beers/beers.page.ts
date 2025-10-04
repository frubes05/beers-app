import { Component, inject, ViewContainerRef } from '@angular/core';
import { BeersFacade } from '../beers/beers.facade';
import { BeerFiltersComponent } from './components/beer-filters/beer-filters.component';
import { BeerListComponent } from './components/beer-list/beer-list.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ScrollToComponent } from '../../shared/components/scroll-to/scroll-to.component';
import { BeerViewModel } from './types/types';
import { ModalService } from '../../core/services/modal-service/modal.service';
import { BeerModalComponent } from './components/beer-modal/beer-modal.component';

@Component({
  selector: 'app-beers',
  standalone: true,
  imports: [
    BeerFiltersComponent,
    BeerListComponent,
    PaginationComponent,
    HeaderComponent,
    FooterComponent,
    ScrollToComponent,
  ],
  templateUrl: './beers.page.html',
})
export class BeersPage {
  readonly beersFacade = inject(BeersFacade);
  readonly modalsService = inject(ModalService);
  readonly viewContainerRef = inject(ViewContainerRef);

  handleDetailsClicked(beer: BeerViewModel) {
    this.modalsService.openModal({
      data: beer,
      viewContainerRef: this.viewContainerRef,
      modal: BeerModalComponent,
    });
  }

  handlePageClick(page: number) {
    this.beersFacade.goToPage(page);
  }
}
