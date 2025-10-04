import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CachingService } from '@root/core/services/caching-service/caching.service';
import { GlobalErrorService } from '@root/core/services/global-error-service/global-error.service';
import { UrlService } from '@root/core/services/url-service/url.service';
import { ErrorComponent } from '@shared/components/error/error.component';

describe('Error', () => {
  let component: ErrorComponent;
  let globalErrorService: GlobalErrorService;
  let urlService: UrlService;
  let cachingService: CachingService;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: GlobalErrorService,
          useValue: {
            clearError: jasmine.createSpy('clearError'),
          },
        },
        {
          provide: UrlService,
          useValue: {
            triggerRefresh: jasmine.createSpy('triggerRefresh'),
          },
        },
        {
          provide: CachingService,
          useValue: {
            clear: jasmine.createSpy('clear'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    globalErrorService = TestBed.inject(GlobalErrorService);
    urlService = TestBed.inject(UrlService);
    cachingService = TestBed.inject(CachingService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retry if an error occured', () => {
    component.retry();

    expect(globalErrorService.clearError).toHaveBeenCalledOnceWith();
    expect(urlService.triggerRefresh).toHaveBeenCalledOnceWith();
    expect(cachingService.clear).toHaveBeenCalledOnceWith();
  });
});
