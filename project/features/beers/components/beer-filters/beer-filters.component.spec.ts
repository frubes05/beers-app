import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BeerFiltersComponent } from '@features/beers/components/beer-filters/beer-filters.component';
import { UrlService } from '@root/core/services/url-service/url.service';
import { FiltersService } from '@features/beers/services/filters.service';
import { IBeerFilters } from '@features/beers/types/types';
import { FormService } from '@features/beers/services/form.service';
import { mockFilters, mockFormGroup } from '@features/beers/mocks/beers-mock';

describe('BeerFilters', () => {
  let component: BeerFiltersComponent;
  let filtersService: FiltersService;
  let formsService: FormService;
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
        {
          provide: FiltersService,
          useValue: {
            filters: signal(mockFilters),
            updateFilters: jasmine.createSpy('updateFilters'),
            resetFilters: jasmine.createSpy('resetFilters'),
          },
        },
        {
          provide: FormService,
          useValue: {
            formGroup: mockFormGroup,
            updateFormValues: jasmine.createSpy('updateFormValues'),
            resetFormValues: jasmine.createSpy('resetFormValues'),
          },
        },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BeerFiltersComponent);
    component = fixture.componentInstance;
    filtersService = TestBed.inject(FiltersService);
    formsService = TestBed.inject(FormService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update form values initially in effect', () => {
    expect(formsService.updateFormValues).toHaveBeenCalledOnceWith(mockFilters);
  });

  it('should update filters when form value has changed', async () => {
    mockFormGroup.patchValue({ ...mockFormGroup.getRawValue(), beer_name: 'ipa' });

    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(filtersService.updateFilters).toHaveBeenCalledOnceWith({
      ...(mockFormGroup.getRawValue() as IBeerFilters),
      beer_name: 'ipa',
    });
  });
});
