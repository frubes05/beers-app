import { TestBed } from '@angular/core/testing';

import { BeersService } from '@features/beers/services/beers.service';

describe('Beers', () => {
  let service: BeersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
