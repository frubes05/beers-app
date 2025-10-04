import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalErrorService } from '@core/services/global-error-service/global-error.service';

@Injectable()
export class ErrorHandlingService implements HttpInterceptor {
  private readonly snackBar = inject(MatSnackBar);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);
  private readonly globalErrorService = inject(GlobalErrorService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(() => this.clearError()),
      catchError((error: HttpErrorResponse) => {
        this.globalErrorService.setError(error.message);
        this.snackBar.open(error.message, 'Dismiss', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        return throwError(() => error);
      })
    );
  }

  setError(message: string) {
    this.errorSubject.next(message);
  }

  clearError() {
    this.errorSubject.next(null);
  }
}
