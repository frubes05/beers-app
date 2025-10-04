import { Component, inject, ViewContainerRef } from '@angular/core';
import { BeersFacade } from '../../facades/beers/beers.facade';
import { BeerFilters } from '../../features/beer-filters/beer-filters.component';
import { BeerList } from '../../features/beer-list/beer-list';
import { Pagination } from '../../components/pagination/pagination';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { ScrollTo } from '../../components/scroll-to/scroll-to';
import { BeerViewModel } from '../../types/types';
import { ModalService } from '../../services/modal-service/modal-service.service';
import { BeerModalComponent } from '../../features/beer-modal/beer-modal.component';

@Component({
  selector: 'app-beers',
  standalone: true,
  imports: [BeerFilters, BeerList, Pagination, Header, Footer, ScrollTo],
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
