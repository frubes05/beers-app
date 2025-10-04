import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCardComponent } from '@features/beers/components/beer-card/beer-card.component';
import { BeerViewModel } from '../../types/types';

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

    component.beer = {
      isFavorite: true,
    } as unknown as BeerViewModel;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
