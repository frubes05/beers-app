import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerFiltersComponent } from './beer-filters.component';

describe('Filters', () => {
  let component: BeerFiltersComponent;
  let fixture: ComponentFixture<BeerFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BeerFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
