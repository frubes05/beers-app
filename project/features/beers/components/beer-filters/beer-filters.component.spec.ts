import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BeerFiltersComponent } from '@features/beers/components/beer-filters/beer-filters.component';
import { UrlService } from '@root/core/services/url-service/url.service';
import { FiltersService } from '../../services/filters.service';
import { BeerFilters } from '../../types/types';
import { FormService } from '../../services/form.service';
import { FormControl, FormGroup } from '@angular/forms';

const realFormGroup = new FormGroup({
  beer_name: new FormControl('', { nonNullable: true, updateOn: 'blur' }),
  abv_gt: new FormControl(0, { nonNullable: true, updateOn: 'blur' }),
  abv_lt: new FormControl(15, { nonNullable: true, updateOn: 'blur' }),
  sortBy: new FormControl('abv:asc', { nonNullable: true }),
  favoritesOnly: new FormControl(false, { nonNullable: true }),
});

export const mockFilters: BeerFilters = {
  beer_name: 'ipa',
  abv_lt: 15,
  abv_gt: 0,
  sortBy: 'abv:asc',
  favoritesOnly: false,
  page: 1,
};

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
            formGroup: realFormGroup,
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
    realFormGroup.patchValue({ ...realFormGroup.getRawValue(), beer_name: 'ipa' });

    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(filtersService.updateFilters).toHaveBeenCalledOnceWith({
      ...(realFormGroup.getRawValue() as BeerFilters),
      beer_name: 'ipa',
    });
  });
});
