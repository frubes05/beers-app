import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerCardComponent } from '@features/beers/components/beer-card/beer-card.component';
import { mockBeer } from '@features/beers/mocks/beers-mock';

describe('BeerCard', () => {
  let component: BeerCardComponent;
  let fixture: ComponentFixture<BeerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerCardComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(BeerCardComponent);
    component = fixture.componentInstance;

    component.beer = mockBeer;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select beer as favorite on favorite star click', () => {
    const component = fixture.componentInstance;
    spyOn(component.favoritesClicked, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    const favoriteButton = buttons[0];

    favoriteButton.click(component.beer);

    expect(component.favoritesClicked.emit).toHaveBeenCalledWith(component.beer);
  });

  it('should select beer for opening modal on details button click', () => {
    const component = fixture.componentInstance;
    spyOn(component.detailsClicked, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    const detailsButton = buttons[1];

    detailsButton.click(component.beer);

    expect(component.detailsClicked.emit).toHaveBeenCalledWith(component.beer);
  });
});
