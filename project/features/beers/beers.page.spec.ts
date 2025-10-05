import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BeersPage } from '@features/beers/beers.page';
import { UrlService } from '@root/core/services/url-service/url.service';
import { mockBeer } from '@features/beers/components/beer-card/beer-card.component.spec';
import { BeerModalComponent } from '@features/beers/components/beer-modal/beer-modal.component';
import { BeersFacade } from '@features/beers/beers.facade';
import { ModalService } from '@root/core/services/modal-service/modal.service';

describe('Beers', () => {
  let component: BeersPage;
  let beersFacade: BeersFacade;
  let modalService: ModalService;
  let fixture: ComponentFixture<BeersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeersPage],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRoute },
        {
          provide: HttpClient,
          useValue: {
            get: jasmine.createSpy('get').and.returnValue({
              pipe: () => ({
                subscribe: () => {},
              }),
            }),
          },
        },
        {
          provide: UrlService,
          useValue: {
            getSearchParamsFromObject: jasmine
              .createSpy('getSearchParamsFromObject')
              .and.callFake(() => new URLSearchParams({ beer_name: 'IPA', page: '1' })),
            getObjectFromSearchParams: jasmine
              .createSpy('getObjectFromSearchParams')
              .and.returnValue({}),
            navigateWithSearchParams: jasmine.createSpy('navigateWithSearchParams'),
            navigateWithoutParams: jasmine.createSpy('navigateWithoutParams'),
          },
        },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BeersPage);
    beersFacade = TestBed.inject(BeersFacade);
    modalService = TestBed.inject(ModalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal with correct parameters when handleDetailsClicked is called', () => {
    spyOn(modalService, 'openModal');

    component.handleDetailsClicked(mockBeer);

    expect(modalService.openModal).toHaveBeenCalledOnceWith({
      data: mockBeer,
      viewContainerRef: component.viewContainerRef,
      modal: BeerModalComponent,
    });
  });

  it('should call goToPage on beersFacade when handlePageClick is called', () => {
    spyOn(beersFacade, 'goToPage');

    component.handlePageClick(2);

    expect(beersFacade.goToPage).toHaveBeenCalledOnceWith(2);
  });
});
