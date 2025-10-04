import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BeerFiltersComponent } from '@features/beers/components/beer-filters/beer-filters.component';
import { UrlService } from '@root/core/services/url-service/url.service';

describe('BeerFilters', () => {
  let component: BeerFiltersComponent;
  let fixture: ComponentFixture<BeerFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerFiltersComponent],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRoute },
        {
          provide: UrlService,
          useValue: {
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

    fixture = TestBed.createComponent(BeerFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
