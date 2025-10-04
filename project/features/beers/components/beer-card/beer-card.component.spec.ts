import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCardComponent } from '@features/beers/components/beer-card/beer-card.component';

describe('BeerCard', () => {
  let component: BeerCardComponent;
  let fixture: ComponentFixture<BeerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BeerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
