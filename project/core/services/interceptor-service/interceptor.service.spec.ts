import { TestBed } from '@angular/core/testing';
import { InterceptorService } from '@core/services/interceptor-service/interceptor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalErrorService } from '@core/services/global-error-service/global-error.service';
import { HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

describe('InterceptorService', () => {
  let interceptor: InterceptorService;
  let snackBar: MatSnackBar;
  let globalErrorService: GlobalErrorService;
  let httpHandler: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InterceptorService,
        { provide: HttpHandler, useValue: jasmine.createSpyObj('HttpHandler', ['handle']) },
        { provide: MatSnackBar, useValue: jasmine.createSpyObj('MatSnackBar', ['open']) },
        {
          provide: GlobalErrorService,
          useValue: jasmine.createSpyObj('GlobalErrorService', ['setError', 'clearError']),
        },
        provideZonelessChangeDetection(),
      ],
    });

    interceptor = TestBed.inject(InterceptorService);
    httpHandler = TestBed.inject(HttpHandler);
    snackBar = TestBed.inject(MatSnackBar);
    globalErrorService = TestBed.inject(GlobalErrorService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should clear previous errors on successful request', (done) => {
    const mockRequest = new HttpRequest('GET', '/api/test');
    const mockResponse = new HttpResponse({ status: 200, body: { success: true } });

    (httpHandler.handle as any).and.returnValue(of(mockResponse));

    spyOn(interceptor, 'clearError').and.callThrough();

    interceptor.intercept(mockRequest, httpHandler).subscribe({
      next: () => {
        expect(interceptor.clearError).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should handle HttpErrorResponse correctly', (done) => {
    const mockRequest = new HttpRequest('GET', '/api/fail');
    const mockError = new HttpErrorResponse({
      status: 500,
      statusText: 'Server Error',
      error: 'Oops!',
    });

    (httpHandler.handle as any).and.returnValue(throwError(() => mockError));

    interceptor.intercept(mockRequest, httpHandler).subscribe({
      error: (err) => {
        expect(err).toBe(mockError);
        expect(globalErrorService.setError).toHaveBeenCalledOnceWith(mockError.message);
        expect(snackBar.open).toHaveBeenCalledOnceWith(
          mockError.message,
          'Dismiss',
          jasmine.objectContaining({
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }),
        );
        done();
      },
    });
  });

  it('should set and clear custom error message manually', () => {
    const errorSubject = spyOn<any>(interceptor['errorSubject'], 'next').and.callThrough();

    interceptor.setError('Custom error');
    interceptor.clearError();

    expect(errorSubject).toHaveBeenCalledWith('Custom error');
    expect(errorSubject).toHaveBeenCalledWith(null);
  });
});
