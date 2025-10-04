import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { BeersService } from '@features/beers/services/beers.service';
import { UrlService } from '@root/core/services/url-service/url.service';

describe('BeersService', () => {
  let service: BeersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: HttpClient },
        { provide: ActivatedRoute, useValue: ActivatedRoute },
        { provide: UrlService, useValue: UrlService },
        provideZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(BeersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
