import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { UrlService } from '@core/services/url-service/url.service';
import { HttpParams } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';

describe('UrlService', () => {
  let urlService: UrlService;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoute: any;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRoute = {
      queryParams: of({ beer_name: 'ipa', page: 1 }),
      snapshot: { queryParams: { beer_name: 'ipa', page: 1 } },
    };

    TestBed.configureTestingModule({
      providers: [
        UrlService,
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
        provideZonelessChangeDetection(),
      ],
    });

    urlService = TestBed.inject(UrlService);
  });

  it('should create', () => {
    expect(urlService).toBeTruthy();
  });

  it('should filter out empty and null values in getCleanParams()', () => {
    const dirty = {
      beer_name: 'ipa',
      empty: '',
      undefinedVal: undefined,
      nullVal: null,
      page: 1,
    } as any;

    const clean = (urlService as any).getCleanParams(dirty);
    expect(clean).toEqual({ beer_name: 'ipa', page: 1 });
  });

  it('should convert object to HttpParams', () => {
    const params = urlService.getSearchParamsFromObject({
      beer_name: 'ipa',
      abv_gt: 5,
      empty: '',
      nullish: null,
    });

    expect(params instanceof HttpParams).toBeTrue();
    expect(params.get('beer_name')).toBe('ipa');
    expect(params.get('abv_gt')).toBe('5');
    expect(params.get('empty')).toBeNull();
  });

  it('should return empty HttpParams if null provided', () => {
    const params = urlService.getSearchParamsFromObject(null);
    expect(params.keys().length).toBe(0);
  });

  it('should map URLSearchParams to object', () => {
    const searchParams = new URLSearchParams('beer_name=ipa&page=2');
    const result = urlService.getObjectFromSearchParams(searchParams);

    expect(result).toEqual({ beer_name: 'ipa', page: '2' });
  });

  it('should call router.navigate with correct cleaned params', async () => {
    mockRouter.navigate.and.resolveTo(true);

    await urlService.navigateWithSearchParams({
      beer_name: 'ipa',
      page: 1,
      empty: '',
    });

    expect(mockRouter.navigate).toHaveBeenCalledOnceWith([], {
      relativeTo: mockRoute,
      queryParams: { beer_name: 'ipa', page: 1 },
      replaceUrl: false,
    });
  });

  it('should navigate without params when isInitial = true', async () => {
    mockRouter.navigate.and.resolveTo(true);

    await urlService.navigateWithoutParams(true);

    expect(mockRouter.navigate).toHaveBeenCalledOnceWith([], {
      relativeTo: mockRoute,
      queryParams: {},
      replaceUrl: false,
    });
  });

  it('should navigate without params when isInitial = false', async () => {
    mockRouter.navigate.and.resolveTo(true);

    await urlService.navigateWithoutParams(false);

    expect(mockRouter.navigate).toHaveBeenCalledOnceWith([], {
      relativeTo: mockRoute,
      queryParams: {},
      replaceUrl: false,
    });
  });
});
