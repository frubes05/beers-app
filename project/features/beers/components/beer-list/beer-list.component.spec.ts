import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerListComponent } from '@features/beers/components/beer-list/beer-list.component';
import { UrlService } from '@root/core/services/url-service/url.service';
import { mockBeer } from '@features/beers/components/beer-card/beer-card.component.spec';
import { By } from '@angular/platform-browser';
import { BeerCardComponent } from '@features/beers/components/beer-card/beer-card.component';
import { ErrorComponent } from '@root/shared/components/error/error.component';
import { BeerListEmptyComponent } from '@features/beers/components/beer-list/beer-list-empty/beer-list-empty.component';

describe('BeerList', () => {
  let component: BeerListComponent;
  let fixture: ComponentFixture<BeerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerListComponent],
      providers: [{ provide: UrlService, useValue: UrlService }, provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(BeerListComponent);
    component = fixture.componentInstance;

    component.loading = false;
    component.error = null;
    component.beers = [mockBeer];

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should emit detailsClicked when beer card is clicked', () => {
    fixture = TestBed.createComponent(BeerListComponent);
    component = fixture.componentInstance;

    component.loading = false;
    component.error = null;
    component.beers = [mockBeer];

    spyOn(component.detailsClicked, 'emit');

    fixture.detectChanges();

    const beerCard = fixture.debugElement.query(By.directive(BeerCardComponent));
    beerCard.triggerEventHandler('detailsClicked', mockBeer);

    expect(component.detailsClicked.emit).toHaveBeenCalledOnceWith(mockBeer);
  });

  it('should emit retryClicked when error is shown and user clicks retry', () => {
    fixture = TestBed.createComponent(BeerListComponent);
    component = fixture.componentInstance;

    component.error = 'Error';
    component.loading = false;
    component.beers = [];

    spyOn(component.retryClicked, 'emit');

    fixture.detectChanges();

    const errorComponent = fixture.debugElement.query(By.directive(ErrorComponent));
    errorComponent.triggerEventHandler('retryClicked');

    expect(component.retryClicked.emit).toHaveBeenCalledOnceWith();
  });

  it('should emit resetFiltersClicked if beer list is empty', () => {
    fixture = TestBed.createComponent(BeerListComponent);
    component = fixture.componentInstance;

    component.loading = false;
    component.error = null;
    component.beers = [];

    spyOn(component.resetFiltersClicked, 'emit');

    fixture.detectChanges();

    const emptyComponent = fixture.debugElement.query(By.directive(BeerListEmptyComponent));
    emptyComponent.triggerEventHandler('resetFiltersClicked');

    expect(component.resetFiltersClicked.emit).toHaveBeenCalledOnceWith();
  });
});
