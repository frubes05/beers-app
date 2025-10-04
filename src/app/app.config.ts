import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './routes/app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorHandlingService } from './services/error-handling/error-handling.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'ignore',
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingService,
      multi: true,
    },
  ],
};
