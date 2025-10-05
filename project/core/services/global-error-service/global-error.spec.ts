import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GlobalErrorService } from '@core/services/global-error-service/global-error.service';

describe('GlobalErrorService', () => {
  let globalErrorService: GlobalErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorService, provideZonelessChangeDetection()],
    });
    globalErrorService = TestBed.inject(GlobalErrorService);
  });

  it('should be created', () => {
    expect(globalErrorService).toBeTruthy();
  });

  it('should initially emit null as default error', (done) => {
    globalErrorService.error$.subscribe((value) => {
      expect(value).toBeNull();
      done();
    });
  });

  it('should emit error message when setError is called', (done) => {
    const errorMessage = 'Something went wrong!';
    let callCount = 0;

    globalErrorService.error$.subscribe((value) => {
      callCount++;

      if (callCount === 2) {
        expect(value).toBe(errorMessage);
        done();
      }
    });

    globalErrorService.setError(errorMessage);
  });

  it('should clear error when clearError is called', (done) => {
    const errorMessage = 'Temporary error';

    globalErrorService.setError(errorMessage);

    globalErrorService.error$.subscribe((value) => {
      if (value === null) {
        expect(value).toBeNull();
        done();
      }
    });

    globalErrorService.clearError();
  });
});
