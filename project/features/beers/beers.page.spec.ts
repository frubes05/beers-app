import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { BeersPage } from '@features/beers/beers.page';
import { UrlService } from '@root/core/services/url-service/url.service';

describe('Beers', () => {
  let component: BeersPage;
  let fixture: ComponentFixture<BeersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeersPage],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRoute },
        {
          provide: HttpClient,
          useValue: {
            get: jasmine.createSpy('get').and.returnValue({
              pipe: () => ({
                subscribe: () => {},
              }),
            }),
          },
        },
        {
          provide: UrlService,
          useValue: {
            getSearchParamsFromObject: jasmine
              .createSpy('getSearchParamsFromObject')
              .and.callFake(() => new URLSearchParams({ beer_name: 'IPA', page: '1' })),
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

    fixture = TestBed.createComponent(BeersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
