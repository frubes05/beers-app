import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerListEmptyComponent } from '@features/beers/components/beer-list/beer-list-empty/beer-list-empty.component';
import { FormService } from '@root/features/beers/services/form.service';

describe('BeerListEmpty', () => {
  let component: BeerListEmptyComponent;
  let formsService: FormService;
  let fixture: ComponentFixture<BeerListEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerListEmptyComponent],
      providers: [
        {
          provide: FormService,
          useValue: {
            resetFormValues: jasmine.createSpy('resetFormValues'),
          },
        },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BeerListEmptyComponent);
    component = fixture.componentInstance;
    formsService = TestBed.inject(FormService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call reset filters functions on button click', () => {
    spyOn(component.resetFiltersClicked, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(formsService.resetFormValues).toHaveBeenCalledOnceWith();
    expect(component.resetFiltersClicked.emit).toHaveBeenCalledOnceWith();
  });
});
