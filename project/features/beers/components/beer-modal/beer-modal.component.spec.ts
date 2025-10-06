import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerModalComponent } from '@features/beers/components/beer-modal/beer-modal.component';
import { mockBeer } from '@features/beers/mocks/beers-mock';

describe('BeerModal', () => {
  let component: BeerModalComponent;
  let closeModalSpy: jasmine.Spy;
  let fixture: ComponentFixture<BeerModalComponent>;

  beforeEach(async () => {
    closeModalSpy = jasmine.createSpy('closeModal');

    await TestBed.configureTestingModule({
      imports: [BeerModalComponent],
      providers: [
        {
          provide: 'CONTEXT',
          useValue: mockBeer,
        },
        {
          provide: 'CLOSE_MODAL',
          useFactory: () => closeModalSpy,
        },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BeerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize beerData with injected CONTEXT', () => {
    expect(component['beerData']).toEqual(mockBeer);
  });

  it('should call closeModal with element when closeBeerModal is triggered', () => {
    const element = document.createElement('div');

    component.closeBeerModal(element);

    expect(closeModalSpy).toHaveBeenCalledOnceWith(element);
  });
});
